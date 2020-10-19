// includes

var http = require("http");
var inspect = require("util").inspect;
var MariaSQLClient = require("mariasql");

// main

function main()
{
	var database = new Database
	(
		"127.0.0.1", // host
		"root", // username
		"Password42" // password
	);

	var webServer = new WebServer
	(
		"127.0.0.1", // hostAddress
		1337, // portNumber
		database
	);

	webServer.start();
}

// classes

function Database(host, username, password)
{
	this.host = host;
	this.username = username;
	this.password = password;
}
{
	Database.prototype.connect = function()
	{
		this.client = new MariaSQLClient();
		this.client.connect
		(
			{
		  		host: this.host,
		  		user: this.username,
		  		password: this.password
			}
		);

		this.client.on
		(
			"connect", 
			this.handleEventClientConnect.bind(this)
		).on
		(
			"error", 
			this.handleEventClientError.bind(this)
		).on
		(
			"close",
			this.handleEventClientClose.bind(this)
		);
	}

	Database.prototype.query = function(queryText, callback, thisForCallback)
	{
		this.connect();

		this.client.query(queryText).on
		(
			"result", 
			this.handleEventQueryResult.bind(this, callback, thisForCallback)
		).on
		(
			"end", 
			this.handleEventQueryEnd.bind(this)
		);

		this.client.end();
	}

	// events

	Database.prototype.handleEventClientClose = function(hadError) 
	{ 
		console.log("Client closed."); 
	}

	Database.prototype.handleEventClientConnect = function() 
	{ 
		console.log("Client connected."); 
	}

	Database.prototype.handleEventClientError = function(error)
	{
		console.log("Client error: " + error);
	}

	Database.prototype.handleEventQueryEnd = function() 
	{ 
		console.log("Done with all results."); 
	}

	Database.prototype.handleEventQueryResult = function
	(
		callback, thisForCallback, result
	) 
	{
		var rowsRetrieved = [];

		result.on
		(
			"row", 
			this.handleEventQueryResultRow.bind
			(
				this, 
				rowsRetrieved
			)
		).on
		(
			"error", 
			this.handleEventQueryResultError.bind(this)
		).on
		(
			"end", 
			this.handleEventQueryResultEnd.bind
			(
				this, rowsRetrieved, callback, thisForCallback
			)
		);
	}

	Database.prototype.handleEventQueryResultEnd = function
	(
		rowsRetrieved, callback, thisForCallback, info
	) 
	{ 
		console.log("Result finished successfully."); 
		callback.call(thisForCallback, rowsRetrieved);
	}

	Database.prototype.handleEventQueryResultError = function(error) 
	{ 
		console.log("Result error: " + inspect(error)); 
	}

	Database.prototype.handleEventQueryResultRow = function(rowsRetrieved, row) 
	{ 
		var rowAsString = inspect(row);
		rowsRetrieved.push(rowAsString);
	}
}

function WebServer(hostAddress, portNumber, database)
{
	this.hostAddress = hostAddress;
	this.portNumber = portNumber;
	this.database = database;

	this.server = http.createServer
	(
		this.handleRequest.bind(this)
	);
}
{
	WebServer.prototype.start = function()
	{
		this.server.listen(this.portNumber, this.hostAddress);

		console.log
		(
			"Server running at http://" 
			+ this.hostAddress + ":" 
			+ this.portNumber + "/"
		);
	}

	// events

	WebServer.prototype.handleRequest = function(webRequest, webResult) 
	{
		if (webRequest.url == "/favicon.ico")
		{
			// Ignore favicon requests.
			return;
		}

		this.database.query
		(
			"show databases",
			this.handleRequest_QueryComplete.bind(this, webResult),
			this // thisForQuery
		);
	}

	WebServer.prototype.handleRequest_QueryComplete = function(webResult, rowsRetrieved)
	{
		webResult.writeHead
		(
			200, // OK
			{"Content-Type": "text/plain"}
		);
	
		var resultContent = rowsRetrieved.join("\n");

		console.log("Result: " + resultContent);
	
		webResult.end(resultContent);
	}
}

// run

main();