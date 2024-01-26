import "reflect-metadata";
import { DataSource } from "typeorm";
import { DB_CONFIG } from "@helpers/databaseConfiguration";
import {Coin} from "@entities/Coin";
import {Product} from "@entities/Product";
import {Purchase} from "@entities/Purchase";

export const AppDataSource = new DataSource({
  type: DB_CONFIG.type,
  database: DB_CONFIG.database,
  synchronize: true,
  logging: false,
  entities: [Coin, Product, Purchase],
  migrations: [],
  subscribers: [],
});
