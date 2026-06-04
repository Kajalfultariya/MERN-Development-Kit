import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    week: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    locked: {
        type: Boolean,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    lessons: [{
        id: String,
        title: String,
        done: Boolean,
        doctype: String
    }]
})

export default mongoose.model("Curriculums", userScheme)