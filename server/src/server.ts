import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./docs/swagger";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3000", 10);

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());


app.listen(PORT, () => {
    console.log(`It's live on http://localhost:${PORT}`)
})
