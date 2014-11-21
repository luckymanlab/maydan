#Full-Stack JavaScript application based on:  
* Node.js
* MongoDB
* Express
* Mongoose
* Backbone.js
* Google Maps API
* Grunt

#Instruction  
To run webservice you need to make 3 steps:  

* First step: npm i (install all node packages)
* Next u need to set current way to your mongodb path:  
  1) Open package.json,   
  2) In line 19: "start": "start cmd.exe @cmd /k C:\\mongo\\bin\\mongod --dbpath db\\data | supervisor ./bin/www" change C:\\mongo\\bin\\ to your mongo path,    
  3) Open ./db/create-user.bat and change "C:\mongo\bin\mongo.exe" to your current way.   
* Before you run server you need to create user with admin permistions. You should type "npm run create-user" into prompt.
* To start server type: npm start (it will start mongo server and then node server).
* Your server will watch 3000 port (http://localhost:3000/incident - must responce json with all incendents).


#npm-scripts:  
* "npm start" - started app,
* "npm run server" - started only express server,
* "npm run mongodb" - started only mongodb;
* "npm run create-user" - create user "padawan", and give him admin permitions
