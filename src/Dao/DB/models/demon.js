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
        enum: ["Neutral", "Order", "Law"]
    },
    race: {
        type: String,
        default: "Fiend"
    },
    info: [
        {
            title: String,
            sectionInfo: String
        }
    ]
})

demonSchema.plugin(mongoosePaginate);
const demonModel = mongoose.model(demonCollection, demonSchema);

export default demonModel;