const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('User' , 'root' , '' , {
    
    host: 'localhost',
    dialect:'mysql',
    port: 3306,
    logging:console.log,
    
});

sequelize.authenticate()

    .then( () => console.log("Database connected"))

    .catch( (err) => console.log("Error: ", err));

module.exports = sequelize;