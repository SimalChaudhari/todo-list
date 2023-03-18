"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config?.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config, {
    logging: function (str) {
      console.log(str)
    }
  }
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  }).forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize

db.userTable = require("./user")(sequelize, Sequelize.DataTypes);
db.todoTable = require("./todo")(sequelize, Sequelize.DataTypes);


async function main() {
  await db.sequelize.sync({ alter: true });
  console.log("Database connected");
}
main(); 

// Relationship

db.userTable.hasMany(db.todoTable, { foreignKey: "userId", as: "howadmin" });
db.todoTable.belongsTo(db.userTable, { foreignKey: "userId", targetKey: 'id'  });

module.exports = db;