use maydan
db.createUser({ user: "padawan", pwd: "123123", roles:[{ role: "readWrite", db: "maydan" }]})