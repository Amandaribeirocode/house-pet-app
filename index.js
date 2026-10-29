import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDatabase from "./database/db.js";
import routes from "./routes/petRoutes.js";



const app = express()
const PORT = process.env.PORT || 3333;


app.use(cors());
app.use(express.json());

app.use(routes);

connectToDatabase()
    .then(() => {
        console.log("✅ Conectado ao MongoDB com sucesso!");
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`)
        });
    })
    .catch((error) => {
        console.error("❌ Erro ao conectar no banco de dados:", error);
    });
