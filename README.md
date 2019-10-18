# HallOfKnowledge_SI

######################
# Anas M KARDY       #
# Boubacar DIALLO    #
# Farid MADJOUDJ     #
# Mounir FACI        #
######################
 
Le projet se compose d'une partie back-end (le répertoire courant du projet) et d'une partie front-end (le répertoire ./front-end),
 
1- Configuration des bases de données: ./config/db.js
Remarque: 
		- La variable préfixe sert à prefixer les noeuds et les relations de Neo4j
		- Donc si on veut travailler sur le serveur d'obiwan2:
			On ajouter le préfixe "ABFM_" d'ou la concatenation des la configuration de Neo4j avec la variable prefixe dans ./config/db.js
 
Importation des bases de donnée: ./DATABASE/
	Le repertoire ci dessus, regroupe les differents scripts bases de données et les données de test
	**Pour Maria**
		Créer une base de données portant le nom de 'users' et 
		Importer le fichier ./DATABASE/Maria/USERS.sql
		Remarque : 
			Les mots de passes sont sauvegardés au clair dans la base de données afin que vous puissiez les manipuler plus facilement.
			"Ce n'est pas une erreur --> c'etait volontaire"
	**Pour MongoDB**
		La base de données sur obiwan2 estbien remplis "ABFM_AppSI"
		Mais si on veut travailler en local :
			Créer une base de données portant le nom de 'AppSI' et 
			Importer les fichiers de données JSON ./DATABASE/Mongo/AppSI/DataJSON/.*json
				Sous le repertoire ./DATABASE/Mongo/AppSI/DataJSON/ executer les commandes suivantes :
				mongoimport --db AppSI --collection Cours  --file cours.json
				mongoimport --db AppSI --collection Partie  --file parties.json
				mongoimport --db AppSI --collection Chapitre  --file chapitres.json

			Ou bien utiliser l'outil graphique Studio 3T qui permet de manipuler plus facilement les documents

	**Pour Neo4j**
		La base de données sur obiwan2 est bien remplis.
		Mais si on veut travailler on local :
			- On exécute les requêtes qui se trouves dans les fichiers txt pour l'insertion des noeuds et leurs relations.
				Pour les relations les requêtes doivent etre executé bloc par bloc pas tout à la fois.
			- Sinon, on importe la base de données  qui a été exporté vers 'graph.db.dump'
				L'importation s'effectue en ligne de commande.

Installation du projet:
	Ouvrir le terminal dans ce répertoire courant et lancer les commandes:
		1) npm install (pour installer les dépendences du back-end)
		2) npm run client-install (pour installer les dépendences du front-end)
 
Pour lancer le projet:
	Ouvrir le terminal dans ce répertoire courant et lancer la commande:
		npm run dev
