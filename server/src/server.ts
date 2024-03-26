import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

const PORT = parseInt(process.env.PORT || "3000", 10);

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`It's live on http://localhost:${PORT}`)
})
