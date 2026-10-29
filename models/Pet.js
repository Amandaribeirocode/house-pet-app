import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    imageUrl: {
        type: String,
        required: false
    },
    species: {
        type: String, 
        required: true
    },
    ageYears: {
        type: Number, 
        required: true
    },
    vaccinated: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "disponível"
    }
})

const Pet = mongoose.model("Pet", petSchema);

export default Pet;

