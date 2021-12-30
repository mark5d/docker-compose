db.auth('admin', '78xYv9fyLnmxfUFpuy')

db = db.getSiblingDB('demo')

db.createUser({
  user: "admin",
  pwd: "78xYv9fyLnmxfUFpuy",
  roles: [{role: "readWrite", db: "demo"}]
});

db.createUser({
  user: "myadmin",
  pwd: "myadmin123",
  roles: [{role: "readWrite", db: "demo"}]
});