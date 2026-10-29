import Pet from "../models/Pet.js";


export async function createPet(req, res) {
    try {
        const newPet = await Pet.create(req.body);

        return res.status(201).json(newPet);
    
} catch (error) {
    return res.status(500).json({message: "Erro ao cadastrar pet", error: error.message});
}

}

export async function getAllPets (req, res) {
    try {
        const pets = await Pet.find()

        return res.status(200).json(pets);
    } catch (error){
        return res.status(500).json({message: "Erro ao encontrar pets", error: error.message});
    }
}

export async function updatePet (req, res) {
    try {
        const {id} = req.params;
        const updatePet = await Pet.findByIdAndUpdate(id, req.body, {new: true});

        return res.status(200).json(updatePet);
    } catch (error) {
        return res.status(500).json({message: "Erro ao atualizar pet", error: error.message})
    }
}


export async function deletePet (req, res) {
    try {
        const {id} = req.params;
        const deletePet = await Pet.findByIdAndDelete(id);

        return res.status(200).json({ message: "Pet removido com sucesso!"})
    } catch (error) {
        return res.status(500).json({message: "Pet não encontrado", error: error.message})
    }
}


