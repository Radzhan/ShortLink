import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    }
});

const Url = mongoose.model('Url', UrlSchema);
export default Url;