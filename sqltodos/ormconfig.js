const { Config } = require('@foal/core');


module.exports = {
  /* SQLite3 Config
  type: "sqlite",
  database: Config.get('database.database'),*/

  /* MySQL
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "augusttodo",
  logging: false, */


  dropSchema: Config.get('database.dropSchema', false),
  entities: ["build/app/**/*.entity.js"],
  migrations: ["build/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations"
  },
  synchronize: Config.get('database.synchronize', false)
}
