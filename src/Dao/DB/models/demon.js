import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const demonCollection = 'demons'

const demonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    alignment: {
        type: String,
        default: "Neutral",
        enum: ["Neutral", "Order", "Law", "Other"]
    },
    race: {
        type: String,
        default: "Fiend"
    },
    image: {
        data: Buffer,
        contentType: String
    },
    info: {
        type: String,
        required: true
    } 
})

demonSchema.plugin(mongoosePaginate);
const demonModel = mongoose.model(demonCollection, demonSchema);

export default demonModel;