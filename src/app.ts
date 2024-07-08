import express from "express";
import fs from "fs";
import path from 'path';
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import clienteRoutes from "./src/routes/client-routes";
// import * as swaggerDocument from '../swagger.json';

const app = express();
app.use(express.json());

// const swaggerFile = fs.readFileSync("../swagger.yaml", "utf8");
// const swaggerDocument = load(swaggerFile);

// const swaggerDocument = YAML.load("../swagger.yaml");

const absoluteFilePath = path.resolve(__dirname, './swagger.yaml');
const swaggerDocument = YAML.load(absoluteFilePath);

// const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/clientes", clienteRoutes);

export default app;
