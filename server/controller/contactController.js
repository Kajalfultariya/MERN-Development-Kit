import contactModel from "../model/contactModel.js";

//posting data
export const createContact = async (req, res) => {
    try {

   
        const userData = new contactModel(req.body)
       
        if (!userData) {
            return res.status(404).json({ msg: "User not found" })
        }
        const savedData = await userData.save()
        res.status(200).json(savedData)
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

//showing data
export const fetchContact = async (req, res) => {
    try {
        const users = await contactModel.find();
        if (users.length === 0) {
            return res.status(400).json({ messsage: "User not found." })

        }
        res.status(200).json(users)

    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
}

// GET single record by ID
export const fetchOneContact = async (req, res) => {
    try {
        const record = await contactModel.findById(req.params.id);
        if (!record) return res.status(404).send("Not found");
        res.json(record);
    } catch (err) {
        res.status(500).send(err);
    }
}

//update data

export const updateContact = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await contactModel.findOne({ _id: id })
        if (!userExist) {
            return res.status(404).json({ message: "User not found." })
        }
        const updateUser = await contactModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateUser);
    } catch (error) {
        res.status(500).json({ error: " Internal Server Error. " })
    }
}


//delete data
export const deleteContact = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await contactModel.findOne({ _id: id })
        if (!userExist) {
            return res.status(404).json({ message: " User Not Found. " })
        }
        await contactModel.findByIdAndDelete(id);
        res.status(201).json({ message: " User deleted Successfully." })
    } catch (error) {
        res.status(500).json({ error: " Internal Server Error. " })
    }
}
