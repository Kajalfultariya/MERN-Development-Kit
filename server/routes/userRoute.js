import express from 'express';
import { create, deleteUser, fetch, fetchOne, update } from '../controller/userController.js';


const route = express.Router()

//curriculum routes
route.post("/create", create)
route.get("/fetch", fetch)
route.get("/fetchone/:id", fetchOne)
route.put("/update/:id", update)
route.delete("/delete/:id", deleteUser)



export default route;

