# KRAKN
Application de chat en ligne


# Contributeurs
BAUDELET Pierre
GEDALGE Baptiste
MYG Dimitri

# Objectifs
Permettre à des utilisateurs authentifiés de créer et modérer des channels en ligne utilisés pour de la messagerie instantanée.

# Technologies utilisées
Afin de réaliser ce projet, nous avons utilisé :
  
  * Node.js : Environnement d'exécution en JavaScript construit sur le moteur open source JavaScript V8 de Google Chrome.
  
  * Librairies Node.js : 
    - Socket.io : Framework traditionnellement utilisé pour créer des application de chat en temps-réel. Socket.io permet une communication bi-directionelle Client-Serveur.
                    Plus précisemment, ce framework permet la possibilité d'envoyer le message d'un client à tous les autres clients connectés à ce même serveur.   
    
    - Express   : Framework flexible et minimal simplifiant la création d'application web grâce à un nombre robuste de spécialisation pour application web et mobiles.
    
  * MariaDB : Base de données relationelle OpenSource créée sur des valeurs de performances et de stabilité.


# Méthode d'installation

1. Télécharger l'ensemble du packet disponible sur GitHub.com.
2. Utiliser l'invite de commande pour exécuter la commande "npm install packet.json" dans le dossier une fois celui-ci téléchargé.
3. Installer MariaDB.
4. Créer la base de données
5. Lancer le serveur avec Node.js Server

# Base de données

2 tables :
  * login : userID; Username; Password; Verified
  * messages : userID; Message; Username


[![Run on Repl.it](https://repl.it/badge/github/KinderPingwiii/KRAKN)](https://repl.it/github/KinderPingwiii/KRAKN)
