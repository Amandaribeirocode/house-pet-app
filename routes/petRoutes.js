import { Router } from "express";
import { createPet, getAllPets, updatePet, deletePet} from "../controllers/petController.js";


const routes = Router();

routes.post("/pets", createPet);
routes.get("/pets", getAllPets);
routes.put("/pets/:id", updatePet);
routes.delete("/pets/:id", deletePet);

export default routes;
