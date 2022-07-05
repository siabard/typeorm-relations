import { DataSource } from "typeorm";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config:SqliteConnectionOptions = {
    type: 'sqlite',
    database: 'db.sqlite3',
    entities: ['dist/**/*.entity.js'],
    synchronize: false,
    migrations: ['dist/src/migrations/*.js'],
    migrationsTableName: 'migrations',
    dropSchema: false,

};

export {config};
export default new DataSource(config);