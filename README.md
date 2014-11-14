#Full-Stack JavaScript application based on:  
* Node.js
* MongoDB
* Express
* Mongoose
* Backbone.js
* Google Maps API
* Grunt

#Instruction  
To run webservice you need make 3 steps:  
<ol>
	<li>First step: npm i (install all node packages)<li/>
	<li>
		Next u need to set current way to your mongodb path:
		* Open package.json
		* In line 19: "start": "start cmd.exe @cmd /k C:\\mongo\\bin\\mongod --dbpath db\\data | supervisor ./bin/www" change C:\\mongo\\bin\\ to your mongo path
		* Open ./db/create-user.bat and change "C:\mongo\bin\mongo.exe" to your current way.
	<li/>
	<li>Before you run server you need to create user with admin permistions. You should type "npm run create-user" into prompt.<li/>
	<li>To start server type: npm start (it will start mongo server and then node server)<li/>
	<li>Your server will watch 3000 port (http://localhost:3000/incident - must responce json with all incendents).<li/>
</ol>

#npm-scripts:  
* "npm start" - started app,
* "npm run server" - started only express server,
* "npm run mongodb" - started only mongodb;
* "npm run create-user" - create user "padawan", and give him admin permitions