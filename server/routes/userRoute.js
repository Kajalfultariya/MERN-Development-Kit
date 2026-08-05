import express from 'express';
import { create, deleteUser, fetch, fetchOne, update } from '../controller/userController.js';
import {
    createCustomer, fetchCustomer, fetchOneCustomer,
    deleteCustomer, updateCustomer
} from '../controller/customerController.js';


const route = express.Router()

//curriculum routes
route.post("/create", create)
route.get("/fetch", fetch)
route.get("/fetchone/:id", fetchOne)
route.put("/update/:id", update)
route.delete("/delete/:id", deleteUser)

//customer routes
route.post("/createCustomer", createCustomer)
route.get("/fetchCustomer", fetchCustomer)
route.get("/fetchoneCustomer/:id", fetchOneCustomer)
route.put("/updateCustomer/:id", updateCustomer)
route.delete("/deleteCustomer/:id", deleteCustomer)


export default route;

