import express from "express";
import swaggerUi from "swagger-ui-express";
import clientRoutes from "./routes/client-routes";

import * as swaggerDocument from './swagger.json';

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/clientes", clientRoutes);

export default app;
