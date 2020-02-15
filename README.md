# tode-backend

Si se va a usar otra aplicacion para loguearse con OAuth2 Strategy cambie la estrategia en **./src/controllers/passport-setup.js**

Actualmente la conexion de **la base de datos esta en localhost** cambiarla para un servicio entre varios ip


TODO: Instalar un lxd con mongo y conectar el backend a ese contenedor.
// {
//     "MONGODB_URI": "mongodb://tode:tode@10.80.3.184:27017/tode",
//     "jwtSecret": "Secrete_User_Password",
//     "port": 4000
// }


// to create a user in mongodb
// db.createUser({
//     user: 'tode',
//     pwd: 'tode',
//     roles: [{ role: 'readWrite', db:'tode'}]
// })

//e
