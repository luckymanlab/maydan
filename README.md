#Full-Stack JavaScript application based on:  
* Node.js
* MongoDB
* Express
* Mongoose
* Backbone.js
* Google Maps API
* Grunt

#Instruction
First you need to give node.js server permission to connect to your mongodb server. You need to create a administrator user and configurate node.js server. 
###To create user, you need to do:
* First step: npm i (install all node packages)
* Run mongod in base directory (for example: C:\\mongo\\bin\\mongod --config .\\db\\mongodb.conf)
* Start mongo in new terminal window.
* Type commands:
    use admin
    db.createUser({ user: "username", pwd: "password", roles:[{ role: "readWrite", db: "maydan" }]})
* Configurate node server. 
    open file: webservice/db/connect.js
    edit this code: 
      var options = {
        user: 'username',
        pass: 'password'
      }

###To run webservice: 
* You need set current way to your mongodb path:  
  1) Open package.json,   
  2) In line 19: "start": "start cmd.exe @cmd /k C:\\mongo\\bin\\mongod --dbpath db\\data | supervisor ./bin/www" change C:\\mongo\\bin\\ to your mongo path.
* To start server type: npm start (it will start mongo server and then node server).
* Your server will watch 3000 port (http://localhost:3000/incident - must responce json with all incendents).


#npm-scripts:  
* "npm start" - started app,
* "npm run server" - started only express server,
* "npm run mongodb" - started only mongodb;
