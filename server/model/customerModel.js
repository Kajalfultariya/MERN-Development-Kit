import mongoose from "mongoose";

const customerScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    txnId: {
        type: String,
        required: true
    },
    /*cardNo: [{
        type: mongoose.Schema.Types.Mixed,
        required: false
    }
   ]*/
})

export default mongoose.model("Customers", customerScheme)