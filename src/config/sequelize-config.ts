import { Sequelize } from 'sequelize';
import { client } from './pg-config';

export const sequelize = new Sequelize({
  host: client.host,
  port: client.port,
  username: client.user,
  password: client.password,
  database: client.database,
  dialect: 'postgres',
  logging: false,
});
