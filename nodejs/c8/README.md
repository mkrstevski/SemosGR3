### Povtoruvanje

req.query -> ?carId=3 //toa sto go pisuvame direkno vo URL posle prasalnikot (?)

req.body -> //JSON objekt {"email": "test@gmail.com", "password": 123, users[]...}

req.params -> :id // toa vi se paramtrite sto vie samite im go davate imeto posle :

req.auth -> express-jwt koe raboti so jsonwebtoken sharing secret // koga pravite ruti sto ocekuvaat da im pratite token (da imate vo Headers vo POSTMAN Authorization key vo koe ke imate Bearer <JSON TOKEN>)

req.files -> express-fileupload // koga rabotite so fajlovi