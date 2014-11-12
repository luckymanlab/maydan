maydan.js
======
Full-Stack JavaScript application based on:
Node.js
MongoDB
Express
Mongoose
Backbone.js
Google Maps API
Grunt

======
To run webservice you need make 3 steps:
    1) First step: npm i (install all node packages)
    2) Next u need to set current way to your mongodb path:
        1) Open package
        2) In line 19: "start": "start cmd.exe @cmd /k C:\\mongo\\bin\\mongod --dbpath db\\data | supervisor ./bin/www" change C:\\mongo\\bin\\ to your mongo path
    3) To start server type: npm start (it will start mongo server and then node server)
    4) Open in browser http://localhost:3000 (http://localhost:3000/incident - must responce json with all incendents)

npm-scripts:
    "npm start" - started app,
    "npm run server" - started only express server,
    "npm run mongodb" - started only mongodb;