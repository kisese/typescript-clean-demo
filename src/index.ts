import {AppDataSource} from "@typeorm-config";
import {ExpressConfig} from "@express-config";
import express from "express";
import {config} from "dotenv";
import seedDatabase from "./infrastructure/typeorm.seeder";

const app = express();
const expressConfig = new ExpressConfig(app);
const main = async () => {
    const typeORM = await AppDataSource.initialize();

    if (typeORM.isInitialized) {
        console.log("Connected to database");

        seedDatabase().then(() => {
            console.log("Seeding completed!");
        }).catch(error => {
            console.error("Seeding failed:", error);
        });

        await expressConfig.init();
    }
};

config({path: "src/.env", debug: true});
main();
export default expressConfig.app;