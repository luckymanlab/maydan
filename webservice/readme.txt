To run webservice you need make 3 steps:
    1) First step: npm i (install all node packages)
    2) Next u need to set current way to your mongodb path:
        1) Open package
        2) In line 21: "start": "start cmd.exe @cmd /k C:\\mongo\\bin\\mongod --dbpath db\\data | supervisor ./bin/www" change C:\\mongo\\bin\\ to your mongo path
    3) To start app type: npm start (it will start mongo server and then node server)
    4) Open in browser http://localhost:3000 (http://localhost:3000/incident - must responce json with all incendents)

npm-scripts: 
    "npm start" - started app,
    "npm run server" - started only express server,
    "npm run mongodb" - started only mongodb;


use maydan
db.createUser({ user: "padawan", pwd: "123123", roles:[{ role: "readWrite", db: "maydan" }]})

