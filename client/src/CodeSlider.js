import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const files = [
  {
    fileName: "server / index.js",
    code: `
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import route from "./routes/userRoute.js"

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/uploads', express.static('uploads'));
dotenv.config();


const PORT = process.env.PORT || 4000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {
    console.log("Database sucessfully connected mongoose....")

    app.listen(PORT, () => {
        console.log("Server on starting on", PORT)
    })
}).catch(err => { console.log(err) });

app.use("/api",route)
`
  },

  {
    fileName: "server/routes/userRoute.js",
    code: `
import express from 'express';
import { create, deleteUser, fetch, fetchOne, update } from '../controller/userController.js';
import { createStudent, deleteUserStudent, fetchStudent, fetchStudentOne, updateStudent } from '../controller/studentController.js';
import { createBook, deleteUserBook, fetchBook, fetchBookOne, updateBook } from '../controller/BooksController.js';

import multer from "multer"
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });


const route = express.Router()

//route.post("/create", upload.single('image'), create)

//book routes
route.post("/create", create)
route.get("/fetch", fetch)
route.get("/fetchone/:id", fetchOne)
route.put("/update/:id", update)
route.delete("/delete/:id", deleteUser)

//students route
route.get("/fetchStudent", fetchStudent)
route.get("/fetchStudentOne/:id", fetchStudentOne)
route.post("/createStudent", createStudent)
route.put("/updateStudent/:id", updateStudent)
route.delete("/deleteStudent/:id", deleteUserStudent)


//borrowbook route
route.get("/fetchBook", fetchBook)
route.get("/fetchBookOne/:id", fetchBookOne)
route.post("/createBook", createBook)
route.put("/updateBook/:id", updateBook)
route.delete("/deleteBook/:id", deleteUserBook)


export default route;
`
  },
    {
    fileName: "server/model/borrowBookModel.js",
    code: `
import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    bookId: {
        type: Number,
        required: true
    },
    borrowDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: false
    }
})

export default mongoose.model("Booksborrowdetails", userScheme)
`
  },

  {
    fileName: "server/model/studentModel.js",
    code: `
import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    enrollmentId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true
    },
    totalBorrowed: {
        type: Number,
        required: false
    },
    activeBorrows: {
        type: [mongoose.Schema.Types.Mixed],
        required: false
    },
})

export default mongoose.model("Students", userScheme)
`
  },
  {
    fileName: "server/model/userModel.js",
    code: `
import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    available: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: false
    },
})

export default mongoose.model("User", userScheme)
`
  },
  {
    fileName: "server/controller/BooksController.js",
    code: `
import Booksborrowdetails from "../model/borrowBookModel.js";

export const fetchBook = async (req, res) => {
    try {
        const users = await Booksborrowdetails.find();
        if (users.length === 0) {
            return res.status(400).json({ messsage: "User not found." })
        }
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
}


//get data by id
export const fetchBookOne = async (req, res) => {
    try {
       
        const record = await Booksborrowdetails.findById(req.params.id);
        if (!record) return res.status(404).send("Not found");
        res.json(record);
    } catch (err) {
        res.status(500).send(err);
    }
}

//post data
//posting data
export const createBook = async (req, res) => {
    try {
      
        const userData = new Booksborrowdetails(req.body)
//        console.log("body", req.body)
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

//update data

export const updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await Booksborrowdetails.findOne({ _id: id })
        if (!userExist) {
            return res.status(404).json({ message: "User not found." })
        }
        const updateUser = await Booksborrowdetails.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateUser);
    } catch (error) {
        res.status(500).json({ error: " Internal Server Error. " })
    }
}


//delete data
export const deleteUserBook = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await Booksborrowdetails.findOne({ _id: id })
        if (!userExist) {
            return res.status(404).json({ message: " User Not Found. " })
        }
        await Booksborrowdetails.findByIdAndDelete(id);
        res.status(201).json({ message: " User deleted Successfully." })
    } catch (error) {
        res.status(500).json({ error: " Internal Server Error. " })
    }
}
    `
  },
  {
    fileName: "server/controller/studentController.js",
    code: `
import studentModel from "../model/studentModel.js";

//get data
export const fetchStudent = async (req, res) => {
    try {
        const users = await studentModel.find();
        if (users.length === 0) {
            return res.status(400).json({ messsage: "User not found." })

        }
        res.status(200).json(users)

    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
}

//get data by id
export const fetchStudentOne = async (req, res) => {
    try {
       
        const record = await studentModel.findById(req.params.id);
        if (!record) return res.status(404).send("Not found");
        res.json(record);
    } catch (err) {
        res.status(500).send(err);
    }
}

//post data
//posting data
export const createStudent = async (req, res) => {
    try {
      
        const userData = new studentModel(req.body)
//        console.log("body", req.body)
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

//update data

export const updateStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await studentModel.findOne({ _id: id })
        if (!userExist) {
            return res.status(404).json({ message: "User not found." })
        }
        const updateUser = await studentModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateUser);
    } catch (error) {
        res.status(500).json({ error: " Internal Server Error. " })
    }
}


//delete data
export const deleteUserStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await studentModel.findOne({ _id: id })
        if (!userExist) {
            return res.status(404).json({ message: " User Not Found. " })
        }
        await studentModel.findByIdAndDelete(id);
        res.status(201).json({ message: " User deleted Successfully." })
    } catch (error) {
        res.status(500).json({ error: " Internal Server Error. " })
    }
}
`
  },
  {
    fileName: "server/controller/userController.js",
    code: `
import User from "../model/userModel.js";

//posting data
export const create = async (req, res) => {
    try {

        console.log("body apidata", req.body)
        const userData = new User(req.body)
        console.log("body", req.body)
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
export const fetch = async (req, res) => {
    try {
        const users = await User.find();
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
export const fetchOne = async (req, res) => {
    try {
        const record = await User.findById(req.params.id);
        if (!record) return res.status(404).send("Not found");
        res.json(record);
    } catch (err) {
        res.status(500).send(err);
    }
}

//update data

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id })
        if (!userExist) {
            return res.status(404).json({ message: "User not found." })
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateUser);
    } catch (error) {
        res.status(500).json({ error: " Internal Server Error. " })
    }
}


//delete data
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id })
        if (!userExist) {
            return res.status(404).json({ message: " User Not Found. " })
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({ message: " User deleted Successfully." })
    } catch (error) {
        res.status(500).json({ error: " Internal Server Error. " })
    }
}
`
  },
  {
    fileName: "server/ .env",
    code: `
PORT=8000
MONGOURL= //Your MongoDB url
JWT_SECRET=dfjhhregherkjgdffwywrweuite
NODE_ENV=production
CLIENT_URL=https://library-management-mern-git.vercel.app
`
  },
  {
    fileName: "client/LandingComponent/BenefitsSection.js",
    code: `
import React from "react";

const BenefitsSection =()=>{
    return(
        <section id="benefits" className="benefits-section">
        <div className="container">
          <h2 className="section-title">Why Choose LibraryHub?</h2>

          <div className="benefits-grid">
            <div className="benefits-content">
              <div className="benefit-item">
                <div className="benefit-number">01</div>
                <div className="benefit-text">
                  <h3>Cloud-Based Access</h3>
                  <p>Access your library from anywhere, anytime, on any device with internet connection.</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-number">02</div>
                <div className="benefit-text">
                  <h3>Real-Time Sync</h3>
                  <p>Inventory synchronizes in real-time across all locations and user devices instantly.</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-number">03</div>
                <div className="benefit-text">
                  <h3>User-Friendly Interface</h3>
                  <p>Intuitive design that works for all ages and technical skill levels with minimal training.</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-number">04</div>
                <div className="benefit-text">
                  <h3>Robust Security</h3>
                  <p>Enterprise-grade encryption and privacy controls to protect all member data securely.</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-number">05</div>
                <div className="benefit-text">
                  <h3>24/7 Support</h3>
                  <p>Dedicated customer support team available round the clock to assist with any issues.</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-number">06</div>
                <div className="benefit-text">
                  <h3>Regular Updates</h3>
                  <p>Continuous feature improvements and security updates at no additional cost.</p>
                </div>
              </div>
            </div>

            <div className="benefits-image">
              <div className="image-placeholder">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                  <g opacity="0.1">
                    <path d="M50 30h100v140H50z" stroke="currentColor" strokeWidth="2" />
                    <path d="M70 60h60M70 85h60M70 110h60M70 135h20" stroke="currentColor" strokeWidth="2" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

    )
}

export default BenefitsSection;`
  },
  {
    fileName: "client/LandingComponent/CreateStudent.js",
    code: `
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const CreateStudent = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [eId, setEId] = useState('');
    const [phone, setPhone] = useState('');
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [nextId, setNextId] = useState(1)

    const fetchStudentData = async () => {
        await axios.get("http://localhost:8000/api/fetchStudent")
            .then((response) => {
                console.log("response", response)
                setNextId(response.data.length+1)
            }).catch(error => { console.log("errr", error) })
    }
    useEffect(() => {
        fetchStudentData()
    }, [])


    const fetchBookData = async () => {

        const newData = {
            "id": nextId,
            "activeBorrows": [],
            "email": email,
            "enrollmentId": eId,
            "joinDate": new Date().toLocaleDateString('en-GB'),
            "name": name,
            "password": password,
            "phone": "+91 " + phone,
            "totalBorrowed": 0
        }
        await axios.post("http://localhost:8000/api/createStudent", newData)
            .then((response) => {
                navigate('/login')
            }).catch(error => { console.log("errr", error) })
    }



    const handleLogin = (e) => {
        e.preventDefault();

        // Add your authentication logic or API call here
        if (!email || !password || !name || !eId || !phone) {
            setLoginError('Please fill in all fields');
        }

        else {
            fetchBookData()
        }


    };

    return (
        <div style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
            <div className="login-container">
                <div className="login-background">
                    <div className="login-blob login-blob-1"></div>
                    <div className="login-blob login-blob-2"></div>
                </div>

                <div className="login-wrapper">
                    <button
                        className="back-button"
                        onClick={() => navigate('/login')}
                    >
                        ← Back to Login
                    </button>

                    <div className="login-card">

                        <form className="login-form">

                            <div className="form-group">
                                <label htmlFor="name" style={{ color: "white" }}
                                    className="form-label">Name</label>
                                <div className="input-wrapper">
                                    <input
                                        id="name"
                                        type="name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter Your Name"
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label" style={{ color: "white" }}
                                >Email Address</label>
                                <div className="input-wrapper">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Your Email"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label" style={{ color: "white" }}
                                >Password</label>
                                <div className="input-wrapper">

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="form-input"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="EnrollmentId" className="form-label" style={{ color: "white" }}
                                >EnrollmentId </label>
                                <div className="input-wrapper">
                                    <input
                                        id="EnrollmentId"
                                        type="EnrollmentId"
                                        name="EnrollmentId"
                                        value={eId}
                                        onChange={(e) => setEId(e.target.value)}
                                        placeholder="Enter Your EnrollmentId"
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone" className="form-label" style={{ color: "white" }}
                                >Phone </label>
                                <div className="input-wrapper">
                                    <input
                                        id="phone"
                                        type="phone"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter Your Phone"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            {loginError && (
                                <div className="error-message">
                                    <span className="error-icon">⚠️</span>
                                    {loginError}
                                </div>
                            )}

                            {/*  <div className="form-footer">
                            <label className="checkbox-label">
                                <input type="checkbox" defaultChecked className="checkbox-input" />
                                Remember me
                            </label>
                            <a href="/" className="forgot-link">Forgot password?</a>
                        </div>*/}

                            <button className="login-button" onClick={(e) => { handleLogin(e) }}>

                                Register

                            </button>
                        </form>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateStudent;`
  },
  {
    fileName: "client/LandingComponent/CtaFooterSection.js",
    code: `
import React from "react";

const CtaFooterSection = ({setCurrentPage}) => {
    return (
        <>
            <section className="cta-section">
                <div className="container">
                    <h2>Ready to Transform Your Library?</h2>
                    <p>Join thousands of libraries already using LibraryHub to streamline their operations.</p>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => setCurrentPage('login')}
                    >
                        Start Your Free Trial Today
                    </button>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-section">
                            <div className="footer-logo">
                                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                                    <path d="M6 4h20v2H6V4zm0 6h20v14H6V10zm2 2v10h16V12H8z" fill="currentColor" />
                                </svg>
                                LibraryHub
                            </div>
                            <p>Modern library management for the digital age.</p>
                        </div>

                        <div className="footer-section">
                            <h4>Product</h4>
                            <ul>
                                <li><a href="/">Features</a></li>
                                <li><a href="/">Pricing</a></li>
                                <li><a href="/">Security</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="/">About</a></li>
                                <li><a href="/">Blog</a></li>
                                <li><a href="/">Contact</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="/">Privacy</a></li>
                                <li><a href="/">Terms</a></li>
                                <li><a href="/">Cookies</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2024 LibraryHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default CtaFooterSection`
  },

  {
    fileName: "client/LandingComponent/FeaturesSection.js",
    code: `
import React from "react";

const FeaturesSection =()=>{
    return(
        <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">Everything you need to manage your library efficiently</p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <path d="M6 4h20v2H6V4zm0 6h20v14H6V10zm2 2v10h16V12H8z" fill="currentColor" />
                </svg>
              </div>
              <h3>Book Management</h3>
              <p>Organize and catalog thousands of books with detailed metadata, ISBN tracking, and automatic cover images.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <path d="M16 2c7.7 0 14 6.3 14 14s-6.3 14-14 14S2 23.7 2 16 8.3 2 16 2z" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M16 8v8l6 3.5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3>Member Portal</h3>
              <p>Easy member registration, profile management, and borrowing history with personalized recommendations.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M20 20l6 6" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3>Advanced Search</h3>
              <p>Find books instantly with powerful search filters, advanced queries, and intelligent recommendations.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <path d="M4 8h24v2H4V8zm0 6h24v2H4v-2zm0 6h24v2H4v-2z" fill="currentColor" />
                </svg>
              </div>
              <h3>Analytics & Reports</h3>
              <p>Track library usage with detailed analytics, generate insightful reports, and monitor key metrics.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <rect x="4" y="8" width="24" height="18" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M4 10h24" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3>Digital Resources</h3>
              <p>Manage e-books, digital journals, and online databases seamlessly within your library system.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <path d="M4 8c0-2 2-4 4-4h16c2 0 4 2 4 4v16c0 2-2 4-4 4H8c-2 0-4-2-4-4V8z" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M12 14l4 4 8-8" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3>Smart Notifications</h3>
              <p>Automated reminders for due dates, renewals, and new book arrivals keep members engaged.</p>
            </div>
          </div>
        </div>
      </section>

    )
}

export default FeaturesSection`
  },
  {
    fileName: "client/LandingComponent/HeroSection.js",
    code: `
import React from "react";

const HeroSection = ({setCurrentPage})=>{
    return(
        <section id="hero" className="hero">
        <div className="hero-background">
          <div className="hero-blob hero-blob-1"></div>
          <div className="hero-blob hero-blob-2"></div>
          <div className="hero-blob hero-blob-3"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Smart Library <span className="gradient-text">Management</span>
          </h1>
          <p className="hero-description">
            Streamline your library operations with our intelligent management system.
            Organize books, manage members, track lending, and grow your collection effortlessly.
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage('login')}
            >
              Get Started
            </button>
            <button className="btn btn-secondary">
              Watch Demo
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat">
              <span className="stat-number">500K+</span>
              <span className="stat-label">Books Managed</span>
            </div>
            <div className="stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

    )
}

export default HeroSection`
  },
  {
    fileName: "client/LandingComponent/LandingPage.css",
    code: `
/* ==================== GLOBAL STYLES ==================== */

:root {
  /* Color Palette */
  --primary-color: #1e40af;
  --primary-dark: #1e3a8a;
  --primary-light: #3b82f6;
  --secondary-color: #4f46e5;
  --accent-color: #f59e0b;
  
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-light: #9ca3af;
  --text-white: #ffffff;
  
  --bg-light: #f9fafb;
  --bg-white: #ffffff;
  --bg-gray: #f3f4f6;
  --bg-dark: #1f2937;
  
  --border-color: #e5e7eb;
  --border-light: #f3f4f6;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  --font-display: 'Georgia', 'Times New Roman', serif;
  
  /* Transitions */
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--font-family);
  color: var(--text-primary);
  background-color: var(--bg-white);
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ==================== NAVIGATION ==================== */

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  box-shadow: var(--shadow-sm);
}

.nav-container {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
}

.nav-logo:hover {
  color: var(--primary-dark);
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 40px;
  align-items: center;
}

.nav-link {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: var(--transition);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-login-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-md);
}

.nav-login-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--primary-color);
}

/* ==================== HERO SECTION ==================== */

.hero {
  margin-top: 70px;
  padding: 80px 20px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.hero-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.hero-blob-1 {
  width: 400px;
  height: 400px;
  background: var(--primary-color);
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.hero-blob-2 {
  width: 300px;
  height: 300px;
  background: var(--secondary-color);
  bottom: -50px;
  left: -50px;
  animation-delay: 2s;
}

.hero-blob-3 {
  width: 250px;
  height: 250px;
  background: var(--accent-color);
  top: 50%;
  left: 10%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(30px, -30px);
  }
  50% {
    transform: translate(-20px, 20px);
  }
  75% {
    transform: translate(-30px, -20px);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 40px;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: inline-block;
  text-decoration: none;
  white-space: nowrap;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  box-shadow: var(--shadow-lg);
}

.btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(30, 64, 175, 0.3);
}

.btn-secondary {
  background: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
  background: var(--bg-light);
  transform: translateY(-4px);
}

.btn-lg {
  padding: 18px 48px;
  font-size: 1.1rem;
}

.hero-stats {
  display: flex;
  gap: 50px;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 40px;
  border-top: 1px solid var(--border-light);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 4px;
}

/* ==================== FEATURES SECTION ==================== */

.features-section {
  padding: 80px 20px;
  background: var(--bg-light);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 60px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  border: 1px solid var(--border-light);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(79, 70, 229, 0.1));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  margin-bottom: 20px;
  transition: var(--transition);
}

.feature-card:hover .feature-icon {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  transform: scale(1.1);
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.7;
}

/* ==================== BENEFITS SECTION ==================== */

.benefits-section {
  padding: 80px 20px;
  background: white;
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.benefits-content {
  display: grid;
  gap: 30px;
}

.benefit-item {
  display: flex;
  gap: 24px;
}

.benefit-number {
  font-size: 2rem;
  font-weight: 900;
  color: var(--primary-color);
  opacity: 0.2;
  min-width: 60px;
}

.benefit-text h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.benefit-text p {
  color: var(--text-secondary);
  line-height: 1.7;
}

.benefits-image {
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.05), rgba(79, 70, 229, 0.05));
  border-radius: 12px;
  padding: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.image-placeholder {
  color: var(--primary-color);
}

/* ==================== PRICING SECTION ==================== */

.pricing-section {
  padding: 80px 20px;
  background: var(--bg-light);
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  max-width: 1100px;
  margin: 0 auto;
}

.pricing-card {
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  position: relative;
  transition: var(--transition);
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.pricing-card.featured {
  border: 2px solid var(--primary-color);
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(30, 64, 175, 0.15);
}

.badge {
  position: absolute;
  top: -15px;
  left: 20px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.pricing-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.pricing-price {
  margin-bottom: 12px;
}

.currency {
  font-size: 1rem;
  color: var(--text-secondary);
}

.amount {
  font-size: 3rem;
  font-weight: 900;
  color: var(--primary-color);
}

.period {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.pricing-description {
  color: var(--text-secondary);
  margin-bottom: 30px;
  font-size: 0.875rem;
}

.pricing-features {
  list-style: none;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pricing-features li {
  color: var(--text-secondary);
  display: flex;
  gap: 12px;
  align-items: center;
}

.pricing-features li.disabled {
  opacity: 0.5;
}

.checkmark {
  color: #10b981;
  font-weight: bold;
}

.cross {
  color: #ef4444;
  font-weight: bold;
}

.pricing-btn {
  width: 100%;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.pricing-card:not(.featured) .pricing-btn {
  background: var(--bg-light);
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.pricing-card:not(.featured) .pricing-btn:hover {
  background: var(--primary-color);
  color: white;
}

.pricing-card.featured .pricing-btn {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  box-shadow: var(--shadow-lg);
}

.pricing-card.featured .pricing-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(30, 64, 175, 0.3);
}

/* ==================== CTA SECTION ==================== */

.cta-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  text-align: center;
}

.cta-section h2 {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 20px;
}

.cta-section p {
  font-size: 1.125rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

/* ==================== FOOTER ==================== */

.footer {
  background: var(--bg-dark);
  color: #d1d5db;
  padding: 60px 20px 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h4 {
  color: white;
  margin-bottom: 20px;
  font-weight: 700;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.footer-section p {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #9ca3af;
}

.footer-section ul {
  list-style: none;
}

.footer-section a {
  color: #d1d5db;
  text-decoration: none;
  font-size: 0.875rem;
  transition: var(--transition);
}

.footer-section a:hover {
  color: white;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 20px;
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
}

/* ==================== LOGIN PAGE STYLES ==================== */

.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  display: flex;
  align-items: center;
  justify-content: center;
   position: relative;
}

.login-background {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.login-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 8s ease-in-out infinite;
}

.login-blob-1 {
  width: 400px;
  height: 400px;
  background: #3b82f6;
  top: -100px;
  right: -100px;
}

.login-blob-2 {
  width: 300px;
  height: 300px;
  background: #4f46e5;
  bottom: -50px;
  left: -50px;
  animation-delay: 3s;
}

.login-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  
}

.back-button {
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 30px;
  transition: var(--transition);
  font-weight: 500;
}

.back-button:hover {
  color: white;
}

.login-card {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 4px;
}

.login-logo {
  width: 30px;
  height: 10px;
  background: linear-gradient(135deg, #3b82f6, #4f46e5);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 20px;
}

.login-title {
  font-size: 2rem;
  font-weight: 900;
  color: white;

}

.login-subtitle {
  color: #cbd5e1;
  font-size: 0.875rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form-label {
 position: relative;
  color: #111212;
  font-size: 0.875rem;
  font-weight: 600;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #64748b;
  pointer-events: none;
}

.form-input {
  width: 100%;
  background: rgba(71, 85, 105, 0.3);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  padding: 12px 14px 12px 40px;
  color: rgb(12, 12, 12);
  font-size: 0.875rem;
  transition: var(--transition);
}

.form-input::placeholder {
  color: #64748b;
}

.form-input:focus {
  outline: none;
  background: rgba(71, 85, 105, 0.5);
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.password-toggle {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0.7;
  transition: var(--transition);
}

.password-toggle:hover {
  opacity: 1;
}

.error-message {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.5);
  border-radius: 8px;
  padding: 2px 2px;
  color: #fca5a5;
  font-size: 0.875rem;
  display: flex;
  gap: 10px;
  align-items: center;
}

.error-icon {
  font-size: 1rem;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;
  cursor: pointer;
  transition: var(--transition);
}

.checkbox-label:hover {
  color: white;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #3b82f6;
}

.forgot-link {
  color: #3b82f6;
  text-decoration: none;
  transition: var(--transition);
}

.forgot-link:hover {
  color: #60a5fa;
  text-decoration: underline;
}

.login-button {
  background: linear-gradient(135deg, #3b82f6, #4f46e5);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
  margin-top: 10px;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
}

.login-button:active {
  transform: translateY(0);
}

.login-divider {
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
  margin: 20px 0;
}

.signup-button {
  width: 100%;
  background: transparent;
  border: 1px solid #3b82f6;
  color: #3b82f6;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.signup-button:hover {
  background: rgba(59, 130, 246, 0.1);
}

.demo-credentials {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
  text-align: center;
}

.demo-label {
  color: #3b82f6;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.875rem;
}

.demo-credentials p {
  color: #cbd5e1;
  font-size: 0.75rem;
  line-height: 1.6;
  font-family: 'Monaco', 'Courier New', monospace;
}

/* ==================== RESPONSIVE DESIGN ==================== */

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    gap: 0;
    padding: 20px;
    border-bottom: 1px solid var(--border-color);
    max-height: calc(100vh - 70px);
    overflow-y: auto;
    display: none;
  }

  .nav-menu.active {
    display: flex;
  }

  .menu-toggle {
    display: block;
  }

  .nav-menu li {
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid var(--border-color);
  }

  .nav-menu li:last-child {
    border-bottom: none;
  }

  .nav-login-btn {
    width: 100%;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .hero-stats {
    gap: 30px;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .benefits-image {
    min-height: 300px;
  }

  .pricing-card.featured {
    transform: scale(1);
  }

  .cta-section h2 {
    font-size: 1.75rem;
  }

  .hero {
    padding: 60px 20px;
    margin-top: 70px;
  }

  .features-section,
  .benefits-section,
  .pricing-section,
  .cta-section {
    padding: 60px 20px;
  }

  .section-title {
    font-size: 2rem;
  }

  .login-card {
    padding: 30px;
  }
}

@media (max-width: 480px) {
  :root {
    font-size: 14px;
  }

  .nav-logo {
    font-size: 1.25rem;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .hero-stats {
    flex-direction: column;
    gap: 20px;
  }

  .benefit-item {
    gap: 16px;
  }

  .pricing-grid {
    grid-template-columns: 1fr;
  }
}

/* ==================== ANIMATIONS ==================== */

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Smooth scrolling support */
@supports (scroll-behavior: smooth) {
  html {
    scroll-behavior: smooth;
  }
}`
  },
  {
    fileName: "client/LandingComponent/LandingPage.js",
    code: `
import React, { useState } from 'react';
import './LandingPage.css';
import Login from './Login';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import BenefitsSection from './BenefitsSection';
import PricingSection from './PricingSection';
import CtaFooterSection from './CtaFooterSection';

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  if (currentPage === 'login') {
    return (
      <Login setCurrentPage={setCurrentPage} />
    );
  }

  return (
    <div className="landing-page">
      {/* Navigation */}
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setCurrentPage={setCurrentPage}
      />
      {/* Hero Section */}
      <HeroSection
        setCurrentPage={setCurrentPage}
      />
      {/* Features Section */}
      <FeaturesSection />
      {/* Benefits Section */}
      <BenefitsSection />
      {/* Pricing Section */}
      <PricingSection />
      {/* CTA Section */}
      <CtaFooterSection
        setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default LandingPage`
  },
  {
    fileName: "client/LandingComponent/Login.js",
    code: `
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [students, setStudents] = useState([]);
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const fetchBookData = async () => {
        await axios.get("http://localhost:8000/api/fetchStudent").then((response) => {
            //setNextId(response.data.length)
            setStudents(response.data)
        }).catch(error => { console.log("errr", error) })
    }
    useEffect(() => {
        fetchBookData()
    }, [])


    const handleLogin = (e) => {
        e.preventDefault();


        // Add your authentication logic or API call here
        if (!email || !password) {
            setLoginError('Please fill in all fields');
        }
        else if (!/^[^@]+@[^@]+[^@]+$/.test(email)) {
            setLoginError('Please enter a valid email');
        }
        else if (password.length < 6) {
            setLoginError('Password must be at least 6 characters');
        }
        else if (email && password) {
            if (email === "adminHost@gmail.com" && password === "adminHost123") {
                localStorage.setItem("credentials", "admin")
                localStorage.removeItem("studentId")
                localStorage.removeItem("studentPersonalId")
                navigate('/home')
            }
            else {
                students.map((item) => (
                    email === item.email && password === item.password ?
                        (navigate('/home'),

                            localStorage.setItem("credentials", "student"),
                            localStorage.setItem("studentId", item._id),
                            localStorage.setItem("studentPersonalId", item.id)
                        )
                        :
                        setLoginError('Not Valid Details')

                ))
            }
        }
        else {
            setLoginError('Please enter a valid details');
        }

    };

    return (
        <div style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
            <div className="login-container">
                <div className="login-background">
                    <div className="login-blob login-blob-1"></div>
                    <div className="login-blob login-blob-2"></div>
                </div>

                <div className="login-wrapper">
                    <button
                        className="back-button"
                        onClick={() => navigate('/')}
                    >
                        ← Back to Home
                    </button>

                    <div className="login-card">
                        <div className="login-header">
                            <div className="login-logo">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M6 4h20v2H6V4zm0 6h20v14H6V10zm2 2v10h16V12H8z" fill="currentColor" />
                                </svg>
                            </div>
                            <h1 className="login-title">LibraryHub</h1>
                            <p className="login-subtitle">Your Digital Library Companion</p>
                        </div>

                        <form className="login-form">

                            <div className="form-group">
                                <label htmlFor="email" className="form-label" style={{ color: "white" }}>
                                    Email Address</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <path d="m22 6-10 7L2 6" />
                                    </svg>&nbps
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Your Email"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label" style={{ color: "white" }}>
                                    Password</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="18" height="18"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>&nbps
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="form-input"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            {loginError && (
                                <div className="error-message">
                                    <span className="error-icon">⚠️</span>
                                    {loginError}
                                </div>
                            )}

                            {/*  <div className="form-footer">
                            <label className="checkbox-label">
                                <input type="checkbox" defaultChecked className="checkbox-input" />
                                Remember me
                            </label>
                            <a href="/" className="forgot-link">Forgot password?</a>
                        </div>*/}

                            <button className="login-button" onClick={(e) => { handleLogin(e) }}>

                                Sign In

                            </button>
                        </form>

                        <div className="login-divider">
                            <span>Don't have an account?</span>
                        </div>

                        <button className="signup-button" onClick={() => { navigate('/register') }}>
                            Create Account
                        </button>

                        {/* <div className="demo-credentials">
                        <p className="demo-label">Try Demo</p>
                        <p>Email: demo@library.com</p>
                        <p>Password: demo123</p>
                    </div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;`
  },
  {
    fileName: "client/LandingComponent/Navigation.js",
    code: `
import React from "react";
import { useNavigate } from 'react-router-dom';


const Navigation = ({ setMobileMenuOpen, mobileMenuOpen, setCurrentPage }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <path d="M6 4h20v2H6V4zm0 6h20v14H6V10zm2 2v10h16V12H8z" fill="currentColor" />
            </svg>
          </div>
          <span>
            <a href="#hero" className="nav-link">LibraryHub</a></span>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <ul className={nav-menu \${mobileMenuOpen ? 'active' : ''}}>
          <li><a href="#features" className="nav-link">Features</a></li>
          <li><a href="#benefits" className="nav-link">Benefits</a></li>
          <li><a href="#pricing" className="nav-link">Pricing</a></li>
          <li>
            <button
              className="nav-login-btn"
              onClick={() => {
                navigate('/login')
              }}
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>

  )
}

export default Navigation`
  },
  {
    fileName: "client/LandingComponent/PricingSection.js",
    code: `
import React from "react";

const PricingSection =()=>{
    return(
        <section id="pricing" className="pricing-section">
        <div className="container">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">Choose the perfect plan for your library</p>

          <div className="pricing-grid">
            <div className="pricing-card">
              <h3 className="pricing-title">Starter</h3>
              <div className="pricing-price">
                <span className="currency">$</span>
                <span className="amount">29</span>
                <span className="period">/month</span>
              </div>
              <p className="pricing-description">Perfect for small libraries</p>
              <ul className="pricing-features">
                <li><span className="checkmark">✓</span> Up to 5,000 books</li>
                <li><span className="checkmark">✓</span> 100 members</li>
                <li><span className="checkmark">✓</span> Basic analytics</li>
                <li><span className="checkmark">✓</span> Email support</li>
                <li className="disabled"><span className="cross">✕</span> API access</li>
              </ul>
              <button className="pricing-btn">Get Started</button>
            </div>

            <div className="pricing-card featured">
              <div className="badge">Most Popular</div>
              <h3 className="pricing-title">Professional</h3>
              <div className="pricing-price">
                <span className="currency">$</span>
                <span className="amount">79</span>
                <span className="period">/month</span>
              </div>
              <p className="pricing-description">Ideal for medium libraries</p>
              <ul className="pricing-features">
                <li><span className="checkmark">✓</span> Up to 50,000 books</li>
                <li><span className="checkmark">✓</span> Unlimited members</li>
                <li><span className="checkmark">✓</span> Advanced analytics</li>
                <li><span className="checkmark">✓</span> Priority support</li>
                <li><span className="checkmark">✓</span> API access</li>
              </ul>
              <button className="pricing-btn">Get Started</button>
            </div>

            <div className="pricing-card">
              <h3 className="pricing-title">Enterprise</h3>
              <div className="pricing-price">
                <span className="currency">Custom</span>
              </div>
              <p className="pricing-description">For large institutions</p>
              <ul className="pricing-features">
                <li><span className="checkmark">✓</span> Unlimited everything</li>
                <li><span className="checkmark">✓</span> Dedicated manager</li>
                <li><span className="checkmark">✓</span> Custom integrations</li>
                <li><span className="checkmark">✓</span> 24/7 support</li>
                <li><span className="checkmark">✓</span> Training included</li>
              </ul>
              <button className="pricing-btn">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

    )
}

export default PricingSection`
  },
  {
    fileName: "client/studentComponent/BorrowedBook.js",
    code: `
import React, { useState } from "react";

const BorrowedBook = ({ books, borrowedBooks, borrowedBookDetails, handleReturnBook, setCurrentPage }) => {
    const [returnModel, setReturnModel] = useState(false)
    return (
        <div className="page borrowed-page">
            {books.length > 0 ? (
                books.map((book, idx) => (
                    book.available.includes(JSON.parse(localStorage.getItem("studentPersonalId"))) ?
                        <div key={idx} className="borrowed-book-item">
                            <div className="borrowed-book-cover">
                                <div className="cover-placeholder">📕</div>
                            </div>

                            <div className="borrowed-book-details">
                                <h3>{book.title}</h3>
                                <p className="author">by {book.author}</p>


                                {borrowedBooks.map((item, idx) => (
                                    item.bookId === book.id && item.studentId === localStorage.getItem("studentId") ?

                                        <div className="dates" key={idx}>
                                            <p>📅 Borrowed: {item.borrowDate}</p>
                                            <p className={due-date \${new Date(item.dueDate) < new Date() ? 'overdue' : ''}}>
                                                📆 Due: {item.dueDate}
                                            </p>
                                        </div>

                                        : ""
                                ))}


                                <div className="dates">
                                    <p>📅 Borrowed: {book.borrowDate}</p>
                                    <p className={due-date \${new Date(book.dueDate) < new Date() ? 'overdue' : ''}}>
                                        📆 Due: {book.dueDate}
                                    </p>
                                </div>

                                <p className="isbn">ISBN: {book.isbn}</p>
                            </div>

                            <button className="return-btn" onClick={() =>
                                setReturnModel(true)}>
                                Return Book
                            </button>
                            {returnModel && (
                                <div className="modal-overlay">
                                    <div className="modal-content">
                                        <h3>Are you sure You want to Return?</h3>
                                        <div className="modal-actions"
                                            style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px" }}>
                                            <button className="setting-btn" onClick={() =>
                                                setReturnModel(false)}>Cancel</button>
                                            <button className="setting-btn delete-btn"
                                                onClick={() => {
                                                    handleReturnBook(book._id, book.id)
                                                    setReturnModel(false)
                                                }}
                                            >Return</button>
                                        </div>
                                    </div>
                                </div>)}
                        </div> : book.available.length < 0 ?
                            <div className="empty-state-large">
                                <div className="empty-icon">📚</div>
                                <h2>No Borrowed Books</h2>
                                <p>Start borrowing books to see them here!</p>
                                <button className="browse-btn" onClick={() => setCurrentPage('browse')}>
                                    Browse Books →
                                </button>
                            </div>
                            : ""
                ))
            ) : (
                <div className="empty-state-large">
                    <div className="empty-icon">📚</div>
                    <h2>No Borrowed Books</h2>
                    <p>Start borrowing books to see them here!</p>
                    <button className="browse-btn" onClick={() => setCurrentPage('browse')}>
                        Browse Books →
                    </button>
                </div>
            )}
        </div>
    )
}

export default BorrowedBook`
  },
  {
    fileName: "client/studentComponent/BrowsePage.js",
    code: `
import React, { useState } from "react";

const BrowsePage = ({ searchQuery, setSearchQuery, filterCategory,
    books, setFilterCategory, handleBorrowBook,
    studentInfo }) => {

    const [filteredBooks, setFilteredBooks] = useState(books)
    const categories = ['All', ...new Set(books.map(book => book.category))];


    const onSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = books.filter(item => item.title.toLowerCase().includes(value) ||
            item.author.toLowerCase().includes(value) || item.isbn.toLowerCase().includes(value)
            || item.category.toLowerCase().includes(value)
        );
        setFilteredBooks(filtered);
    };

    return (
        <div className="page browse-page">
            <div className="search-filter-section">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by title or author or category..."
                    onChange={onSearchChange}
                />

                <div className="filter-buttons">
                    {categories.length > 0 &&
                        categories.map((itemcat, index) => {
                            return (
                                <button key={index}
                                    className={filter-btn \${filterCategory === itemcat ? 'active' : ''}}
                                    onClick={() => {

                                        if (itemcat === "All") { setFilteredBooks(books) }
                                        else {
                                            const filtered = books.filter(item => item.category.includes(itemcat))
                                            setFilteredBooks(filtered);
                                            setFilterCategory(itemcat)
                                        }

                                    }}
                                >
                                    {itemcat}
                                </button>
                            )
                        })}
                </div>
            </div>

            <div className="books-grid" style={{ marginBottom: "50px" }}>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <div key={index} className="book-card">
                            <div className="book-cover"
                                style={{
                                    height:
                                        localStorage.getItem("credentials") === "student" ? "150px" : "100px"
                                }}
                            >
                                <div className="cover-placeholder">
                                    <span className="book-icon">📕</span>
                                </div>
                                {localStorage.getItem("credentials") === "student" &&
                                    <div className=
                                        {availability-badge \${book.available.includes(JSON.parse(localStorage.getItem("studentPersonalId")))
                                            ? 'borrowed' : 'available'}}>
                                        {book.available.includes(JSON.parse(localStorage.getItem("studentPersonalId")))
                                            ? '✗ Borrowed' : '✓ Available'}
                                    </div>}
                            </div>

                            <div className="book-info">
                                <h3 className="book-title">{book.title}</h3>
                                <p className="book-author">{book.author}</p>
                                <p className="book-meta">
                                    <span className="category">{book.category}</span>
                                    <span className="year">{book.year}</span>
                                </p>
                                <p className="isbn">ISBN: {book.isbn}</p>
                            </div>
                            {localStorage.getItem("credentials") === "student" &&
                                <div className="book-actions">
                                    {book.available.includes(JSON.parse(localStorage.getItem("studentPersonalId"))) ? (
                                        <button className="borrowed-btn" disabled>
                                            📖 Borrowed
                                        </button>
                                    ) : (
                                        <button
                                            className="borrow-btn"
                                            onClick={() => handleBorrowBook(book._id, book.id)}
                                        >
                                            📥 Borrow
                                        </button>
                                    )}
                                </div>}
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <p>No books found. Try a different search!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BrowsePage`
  },
  {
    fileName: "client/studentComponent/BrowseStudent.js",
    code: `
import React from "react";
import "./browseStudent.css"

const BrowseStudent = ({ books, studentListData, borrowedBooks }) => {
    return (
        <div className="student-container">
            <div className="list-header">
                <h2>Student Management</h2>
                {/*<button className="add-btn" >Add New Student</button>*/}
            </div>

            <div className="table-responsive">
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Full Name</th>
                            <th>Email Address</th>
                            <th>EnrollmentId</th>
                            <th>Phone</th>
                            <th>Join Date</th>
                            <th>Borrow Date</th>
                            <th>Due Date</th>
                            <th>Borrow Book</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentListData.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.enrollmentId}</td>
                                <td>{student.phone}</td>
                                <td><span className="badge-count">
                                    {new Date(student.joinDate).toLocaleDateString()}
                                </span></td>
                                <td>
                                                                       
                                    {
                                    borrowedBooks.find(book => book.studentId === student._id) &&
                                    new Date(borrowedBooks.find(book => book.studentId === student._id).borrowDate).toLocaleDateString()}
                                    
                                    </td>
                                <td>
                                    {
                                    borrowedBooks.find(book => book.studentId === student._id) &&
                                    new Date(borrowedBooks.find(book => book.studentId === student._id).dueDate).toLocaleDateString()}
                                    </td>
                                <td className="actions">
                                    {student.activeBorrows.map((sbid) => (
                                        books.find(book => book.id === sbid) &&
                                        books.find(book => book.id === sbid).title + " , "
                                    ))}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BrowseStudent`
  },
  {
    fileName: "client/studentComponent/ContentArea.js",
    code: `
import React, { useState } from "react";

const ContentArea = ({ books, studentInfo, borrowedBooks, borrowedBookDetails,
    handleReturnBook, filteredBooksStudent }) => {

    const categories = ['All', ...new Set(books.map(book => book.category))];
    const [returnModel, setReturnModel] = useState(false)

    return (
        <div className="page dashboard-page">
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📚</div>
                    <div className="stat-content">
                        <h3>{books.length}</h3>
                        <p>Total Books</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <h3>
                            {localStorage.getItem("credentials") === "student" ?
                                !studentInfo.activeBorrows ? 0 : books.length - studentInfo.activeBorrows.length : ""}
                            {localStorage.getItem("credentials") === "admin" ?
                                !books ? 0 : books.length - borrowedBooks.length : ""}
                        </h3>
                        <p>Available</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📖</div>
                    <div className="stat-content">
                        <h3>{localStorage.getItem("credentials") === "student" ?
                            !studentInfo.activeBorrows ? 0 : studentInfo.activeBorrows.length : ""}
                            {localStorage.getItem("credentials") === "admin" ?
                                !borrowedBooks ? 0 : borrowedBooks.length : ""}</h3>
                        <p>Currently Borrowed</p>
                    </div>
                </div>
            </div>

            <section className="dashboard-section">
                <h2>📌 Recent Activity</h2>
                <div className="activity-list">
                    {books.length > 0 ? (
                        books.map((book, idx) => {
                            return (
                                book.available.includes(JSON.parse(localStorage.getItem("studentPersonalId"))) ?
                                    <div key={book.id} className="activity-item">
                                        <div className="activity-info" key={idx} >
                                            <h4>{book.title}</h4>
                                            <p className="author">by {book.author}</p>

                                            {borrowedBooks.map((item, idx) => (
                                                item.bookId === book.id && item.studentId === localStorage.getItem("studentId") ?
                                                    <p className="date">Due: {item.dueDate}</p>
                                                    : ""
                                            ))}
                                        </div>
                                        <button className="return-btn"

                                            onClick={() =>
                                                setReturnModel(true)
                                            }
                                        >
                                            Return
                                        </button>
                                        {returnModel && (
                                            <div className="modal-overlay">
                                                <div className="modal-content">
                                                    <h3>Are you sure You want to Return?</h3>
                                                    <div className="modal-actions"
                                                        style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px" }}>
                                                        <button className="setting-btn" onClick={() =>
                                                            setReturnModel(false)}>Cancel</button>
                                                        <button className="setting-btn delete-btn"
                                                            onClick={() => {
                                                                handleReturnBook(book._id, book.id)
                                                                setReturnModel(false)
                                                            }}
                                                        >Return</button>
                                                    </div>
                                                </div>
                                            </div>)}
                                    </div> : book.available.length < 0 ?
                                        <p className="empty-state">No borrowed books. Start exploring!</p> : ""
                            )
                        })
                    ) : (
                        <p className="empty-state">No borrowed books. Start exploring!</p>
                    )}
                </div>
            </section>

            <section className="dashboard-section">
                <h2>🎯 Quick Statistics</h2>
                <div className="charts-grid">
                    <div className="chart-card">
                        <h3>Books by Category</h3>
                        <div className="category-stats">
                            {categories.length > 0 &&
                                categories.map((item, index) => {
                                    return (
                                        item !== "All" &&
                                        <div className="stat-row" key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                                            <span>{item}</span>
                                            {/*<div className="progress-bar">
                                                <div className="progress" style={{ width: '33%' }}></div>
                                            </div>*/}

                                            <span className="count">
                                                {books.filter(book => {
                                                    const matchesCategory = book.category === item;
                                                    return matchesCategory
                                                }).length}

                                            </span>
                                        </div>

                                    )
                                })}


                        </div>
                    </div>

                    <div className="chart-card">
                        <h3>Availability Status</h3>
                        <div className="pie-chart">
                            <div className="pie-item available">
                                <span>{books.filter(b => b.available).length}</span>
                            </div>
                            <div className="pie-info">
                                <p><span className="dot available-dot"></span>
                                    Available:
                                    {localStorage.getItem("credentials") === "student" ?
                                        !studentInfo.activeBorrows ? 0 : books.length - studentInfo.activeBorrows.length : ""}
                                    {localStorage.getItem("credentials") === "admin" ?
                                        !books ? 0 : books.length - borrowedBooks.length : ""}
                                </p>
                                <p><span className="dot borrowed-dot"></span>
                                    Borrowed:
                                    {localStorage.getItem("credentials") === "student" ?
                                        !studentInfo.activeBorrows ? 0 : studentInfo.activeBorrows.length : ""}
                                    {localStorage.getItem("credentials") === "admin" ?
                                        !borrowedBooks ? 0 : borrowedBooks.length : ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default ContentArea`
  },
  {
    fileName: "client/studentComponent/Header.js",
    code: `
import React from "react";

const Header =({setSidebarOpen,sidebarOpen,currentPage,studentInfo})=>{
    return(
        <header className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <h1>{currentPage === 'dashboard' ? '📊 Dashboard' :
              currentPage === 'browse' ? '🔍 Browse Books' :
                currentPage === 'borrowed' ? '📖 My Borrowed Books' :
                  '👤 My Profile'}</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-name">{studentInfo.name}</span>
              <div className="user-avatar">👨‍🎓</div>
            </div>
          </div>
        </header>

    )
}

export default Header`
  },
  {
    fileName: "client/studentComponent/Main.js",
    code: `
import React, { useState, useEffect } from 'react';
import './StudentLibraryStyles.css';
import axios from "axios";
import Sidebar from './Sidebar';
import Header from './Header';
import ContentArea from './ContentArea';
import BrowsePage from './BrowsePage';
import BorrowedBook from './BorrowedBook';
import Profile from './Profile';
import BrowseStudent from './BrowseStudent';

const StudentLibraryManagement = () => {

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [books, setBooks] = useState([]);
  //const [nextId, setNextId] = useState(0);
  const [listBorrowStuId, setListBorrowStuId] = useState([])
  const [studentInfo, setStudentInfo] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [studentListData, setStudentListData] = useState([])
  
  
  //get library Book data
  const fetchBookData = async () => {
    await axios.get("http://localhost:8000/api/fetch").then((response) => {
      //setNextId(response.data.length)
      setBooks(response.data)
    }).catch(error => { console.log("errr", error) })
  }

  //getlibrary student data
  const fetchStudentData = async () => {
    await axios.get("http://localhost:8000/api/fetchStudentOne/" + localStorage.getItem("studentId"))
      .then((response) => {
        setStudentInfo(response.data)
        setListBorrowStuId(response.data.activeBorrows)
      }).catch(error => { console.log("errr", error) })
  }

  //get library Borrow Book data
  const fetchBorrowBookData = async () => {
    await axios.get("http://localhost:8000/api/fetchBook").then((response) => {
      if (response.data)
        setBorrowedBooks(response.data)
    }).catch(error => { console.log("errr", error) })
  }
  //get library Student  data
  const fetchStudentListData = async () => {
    await axios.get("http://localhost:8000/api/fetchStudent").then((response) => {
      if (response.data)
        setStudentListData(response.data)
      console.log("student detail", response.data)
    }).catch(error => { console.log("errr", error) })
  }
  useEffect(() => {
    fetchBookData()
    fetchBorrowBookData()
    fetchStudentListData()
  }, [])
  useEffect(() => {
    if (localStorage.getItem("credentials") === "student") {
      fetchStudentData()
      fetchBorrowBookData()
    }
  }, [])


  const filteredBooksStudent = borrowedBooks.filter(book => {
    const filteredBookStu = book.studentId === localStorage.getItem("studentId");
    return filteredBookStu;
  });

  let arrIdData = []
  let arrData = []
  const handleBorrowBook = async (bookId, id) => {

    books.map(async (book) => {
      if (book.id === id) {
        if (!book.available.includes(JSON.parse(localStorage.getItem("studentPersonalId")))) {
          arrData = [...book.available, JSON.parse(localStorage.getItem("studentPersonalId"))]

          if (!listBorrowStuId.includes(id))
            arrIdData = [...listBorrowStuId, id]

          const newBorrow = {
            bookId: id,
            borrowDate: new Date().toISOString().split('T')[0],
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'active',
            studentId: localStorage.getItem("studentId")
          };

          const formData = { ...books, available: arrData }
          //update book list
          await axios.put(http://localhost:8000/api/update/\${bookId}, formData)
            .then((response) => { }).catch(error => { console.log("errr", error) })


          //add boorow book data
          await axios.post("http://localhost:8000/api/createBook", newBorrow)
            .then((response) => {
            }).catch(error => { console.log("errr", error) })

          //update student list

          const formDataId = { ...studentInfo, activeBorrows: arrIdData }
          await axios.put(http://localhost:8000/api/updateStudent/\${studentInfo._id}, formDataId)
            .then((response) => {
              window.location.reload()
            }).catch(error => { console.log("errr", error) })

        }
      }
      return (<></>)
    })

  };



  const handleReturnBook = async (bookId, id) => {

    books.map(async (book) => {
      if (book.id === id) {

        const newArr = book.available.filter(item => item !== JSON.parse(localStorage.getItem("studentPersonalId")))
        const formData = { ...books, available: newArr }
        //update book list
        await axios.put(http://localhost:8000/api/update/\${book._id}, formData)
          .then((response) => {
            console.log("update book", response.data)
            // window.location.reload()
          })
          .catch(error => { console.log("errr", error) })


        borrowedBooks.map(async (item) => (
          //  console.log("id and stuid", item.bookId, item.studentId),
          item.bookId === id && item.studentId === localStorage.getItem("studentId") ?
            await axios.delete(http://localhost:8000/api/deleteBook/\${item._id})
              .then((res) => {
                setBorrowedBooks(borrowedBooks.filter(b => b.bookId !== bookId));
                //window.location.reload()
              })
              .catch(err => console.log(err)) : ""
        ))

        arrIdData = listBorrowStuId.filter(item => item !== id)
        //update student list
        const formDataId = { ...studentInfo, activeBorrows: arrIdData }
        await axios.put(http://localhost:8000/api/updateStudent/\${studentInfo._id}, formDataId)
          .then((response) => {
            console.log("update res", response.data)
            window.location.reload()
          }).catch(error => { console.log("errr", error) })

      }
      return (<></>)
    })
  };

  let borrowedBookDetails = []
  if (!studentInfo.activeBorrows) { }
  else {
    borrowedBookDetails = borrowedBooks.map(borrow =>
      books.find(b => b.id === borrow.bookId) ? { ...books.find(b => b.id === borrow.bookId), ...borrow } : null
    ).filter(Boolean);
  }


  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        borrowedBooks={borrowedBooks}
        studentInfo={studentInfo}
        books={books}
      />


      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <Header
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          currentPage={currentPage}
          studentInfo={studentInfo}
        />

        {/* Content Area */}
        <div className="content-area">

          {/* Dashboard Page */}
          {currentPage === 'dashboard' && (
            <ContentArea
              books={books}
              borrowedBooks={borrowedBooks}
              studentInfo={studentInfo}
              borrowedBookDetails={borrowedBookDetails}
              handleReturnBook={handleReturnBook}
              filteredBooksStudent={filteredBooksStudent}
            />
          )}

          {/* Browse Books Page */}
          {currentPage === 'browse' && (
            <BrowsePage
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterCategory={filterCategory}
              books={books}
              studentInfo={studentInfo}
              setFilterCategory={setFilterCategory}
              handleBorrowBook={handleBorrowBook}
            />
          )}
          {currentPage === "browsestudent" && (
            <BrowseStudent
              books={books}
              studentListData={studentListData}
              borrowedBooks={borrowedBooks}
            />
          )}
          {/* My Borrowed Books Page */}
          {currentPage === 'borrowed' && (
            <BorrowedBook
              books={books}
              borrowedBooks={borrowedBooks}
              borrowedBookDetails={borrowedBookDetails}
              handleReturnBook={handleReturnBook}
              setCurrentPage={setCurrentPage}
            />
          )}

          {/* Profile Page */}
          {currentPage === 'profile' && (
            <Profile
              studentInfo={studentInfo}
              books={books}
              borrowedBooks={borrowedBooks}
            />
          )}
        </div>
      </main>
    </div>
  );
}
export default StudentLibraryManagement;`
  },
  {
    fileName: "client/studentComponent/Profile.js",
    code: `
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const Profile = ({ studentInfo, borrowedBooks, books }) => {

    const navigate = useNavigate()
    const [updateProfileModel, setUpdateProfileModel] = useState(false)
    const [updatePwd, setUpdatePwd] = useState(false)
    const [deleteModel, setDeleteModel] = useState(false)

    const [currPwd, setCurrPwd] = useState("")
    const [newPwd, setNewPwd] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")
    const [err, setErr] = useState("")

    const [email, setEmail] = useState(studentInfo.email);
    const [password, setPassword] = useState(studentInfo.password);
    const [name, setName] = useState(studentInfo.name);
    const [eId, setEId] = useState(studentInfo.enrollmentId);
    const [phone, setPhone] = useState(studentInfo.phone);

    return (
        <div className="page profile-page">

            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">👨‍🎓</div>
                    <h2>{studentInfo.name}</h2>
                </div>
                <ToastContainer />
                <div className="profile-content">
                    <div className="profile-section">
                        <h3>📋 Personal Information</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Enrollment ID</label>
                                <p>{studentInfo.enrollmentId}</p>
                            </div>
                            <div className="info-item">
                                <label>Email</label>
                                <p>{studentInfo.email}</p>
                            </div>
                            <div className="info-item">
                                <label>Phone</label>
                                <p>{studentInfo.phone}</p>
                            </div>
                            <div className="info-item">
                                <label>Member Since</label>
                                <p>{studentInfo.joinDate}</p>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h3>📊 Library Statistics</h3>
                        <div className="stats-columns">
                            {/*<div className="stat-column">
                                <div className="stat-number">{studentInfo.totalBorrowed}</div>
                                <p>Total Books Borrowed</p>
                            </div>*/}
                            <div className="stat-column">
                                <div className="stat-number">{!studentInfo.activeBorrows ? 0 : studentInfo.activeBorrows.length}

                                </div>
                                <p>Currently Borrowed</p>
                            </div>
                            {/* <div className="stat-column">
                                <div className="stat-number">0</div>
                                <p>Overdue Books</p>
                            </div>*/}
                        </div>
                    </div>

                    <div className="profile-section">
                        <h3>⚙️ Account Settings</h3>
                        <div className="settings-buttons">
                            <button className="setting-btn"
                                onClick={() => {
                                    setDeleteModel(false)
                                    setUpdatePwd(true)
                                    setUpdateProfileModel(false)
                                }}
                            >Change Password</button>
                            <button className="setting-btn"
                                onClick={() => {
                                    setDeleteModel(false)
                                    setUpdatePwd(false)
                                    setUpdateProfileModel(true)
                                }}
                            >Update Profile</button>
                            <button className="setting-btn delete-btn"
                                onClick={async () => {

                                    setDeleteModel(true)
                                    setUpdatePwd(false)
                                    setUpdateProfileModel(false)
                                }}
                            >Delete Account</button>
                        </div>




                        {updateProfileModel && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h3>Update Profile</h3>
                                    <div className="input-groupmodel">
                                        <label> Name</label>
                                        <input
                                            id="name"
                                            type="name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}

                                            required
                                        />
                                    </div>
                                    <div className="input-groupmodel">
                                        <label>Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="input-groupmodel">
                                        <label>Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="input-groupmodel">
                                        <label>enrollmentId</label>
                                        <input
                                            id="EnrollmentId"
                                            type="EnrollmentId"
                                            name="EnrollmentId"
                                            value={eId}
                                            onChange={(e) => setEId(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="input-groupmodel">
                                        <label>phone</label>
                                        <input
                                            id="phone"
                                            type="phone"
                                            name="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div><p style={{ color: "red" }}>{err}</p></div>
                                    <div className="modal-actions"
                                        style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px" }}>
                                        <button className="setting-btn"
                                            onClick={() => {
                                                setName(studentInfo.name)
                                                setEmail(studentInfo.email)
                                                setPassword(studentInfo.password)
                                                setEId(studentInfo.enrollmentId)
                                                setPhone(studentInfo.phone)
                                                setErr("")
                                                setUpdateProfileModel(false)
                                            }}>
                                            Cancel
                                        </button>
                                        <button className="setting-btn" onClick={async () => {
                                            if (!name || !email || !phone || !eId || !password) {
                                                setErr("Enter all details...")
                                            }
                                            else {

                                                const formData = {
                                                    ...studentInfo, name: name,
                                                    email: email,
                                                    password: password,
                                                    enrollmentId: eId,
                                                    phone: phone
                                                }

                                                //update student password
                                                await axios.put(http://localhost:8000/api/updateStudent/\${studentInfo._id},
                                                    formData)
                                                    .then((response) => {
                                                        toast.success("successfully updated Profile");
                                                        setUpdateProfileModel(false)
                                                        setName(studentInfo.name)
                                                        setEmail(studentInfo.email)
                                                        setPassword(studentInfo.password)
                                                        setEId(studentInfo.enrollmentId)
                                                        setPhone(studentInfo.phone)
                                                    })
                                                    .catch(error => { console.log("errr", error) })
                                            }
                                        }
                                        }>Update</button>
                                    </div>
                                </div>
                            </div>

                        )}

                        {updatePwd && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h3>Change Password</h3>
                                    <div className="input-groupmodel">
                                        <label>Current Password</label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            autoComplete="current-password"
                                            value={currPwd}
                                            onChange={(e) => setCurrPwd(e.target.value)}

                                            required
                                        />
                                    </div>
                                    <div className="input-groupmodel">
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            autoComplete="new-password"
                                            value={newPwd}
                                            onChange={(e) => setNewPwd(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="input-groupmodel">
                                        <label>Confirm New Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            autoComplete="new-password"
                                            value={confirmPwd}
                                            onChange={(e) => setConfirmPwd(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div><p style={{ color: "red" }}>{err}</p></div>
                                    <div className="modal-actions"
                                        style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px" }}>
                                        <button className="setting-btn"
                                            onClick={() => {
                                                setCurrPwd("")
                                                setNewPwd("")
                                                setConfirmPwd("")
                                                setErr("")
                                                setUpdatePwd(false)
                                            }}>
                                            Cancel
                                        </button>
                                        <button className="setting-btn" onClick={async () => {
                                            if (!currPwd || !newPwd || !confirmPwd) {
                                                setErr("Enter all details...")
                                            }
                                            else if (studentInfo.password === currPwd) {
                                                if (currPwd !== newPwd) {
                                                    if (newPwd === confirmPwd) {

                                                        const formData = { ...studentInfo, password: newPwd }

                                                        //update student password
                                                        await axios.put(http://localhost:8000/api/updateStudent/\${studentInfo._id},
                                                            formData)
                                                            .then((response) => {
                                                                setErr("")
                                                                toast.success("successfully updated Password");
                                                                setUpdatePwd(false)
                                                                setCurrPwd("")
                                                                setNewPwd("")
                                                                setConfirmPwd("")
                                                                window.location.reload()
                                                            })
                                                            .catch(error => { console.log("errr", error) })
                                                    }
                                                    else
                                                        setErr("Current password and New password are same.")
                                                }
                                                else
                                                    setErr("New Password and Confirm Password are not same")
                                            }
                                            else
                                                setErr("Please Enter correct current password..")

                                        }
                                        }>Update</button>
                                    </div>
                                </div>
                            </div>

                        )}

                        {deleteModel && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h3>Are you sure You want to delete?</h3>
                                    <div className="modal-actions"
                                        style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px" }}>
                                        <button className="setting-btn" onClick={() =>
                                            setDeleteModel(false)}>Cancel</button>
                                        <button className="setting-btn delete-btn"
                                            onClick={async () => {

                                                //update student detail in book list
                                                books.map(async (book) => {
                                                    if (studentInfo.activeBorrows.includes(book.id)) {

                                                        const newArr = book.available.filter(item => item !== JSON.parse(localStorage.getItem("studentPersonalId")))
                                                        const formData = { ...books, available: newArr }

                                                        //update book list
                                                        await axios.put(http://localhost:8000/api/update/\${book._id}, formData)
                                                            .then((response) => {
                                                                console.log("update book", response.data)
                                                            })
                                                            .catch(error => { console.log("errr", error) })
                                                    }

                                                })


                                                //delete borrowed book list of students
                                                borrowedBooks.map(async (item) => {
                                                    if (item.studentId === localStorage.getItem("studentId")) {
                                                        await axios.delete(http://localhost:8000/api/deleteBook/\${item._id})
                                                            .then((res) => { })
                                                            .catch(err => console.log(err))
                                                    }
                                                })

                                                //delete student detail
                                                await axios.delete(http://localhost:8000/api/deleteStudent/\${studentInfo._id})
                                                    .then((res) => {
                                                        navigate("/")
                                                    })
                                                    .catch(err => console.log(err))
                                            }}>
                                            Delete</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Profile`
  },
  {
    fileName: "client/studentComponent/Sidebar.js",
    code: `
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import axios from "axios"


const Sidebar = ({ currentPage, setCurrentPage, borrowedBooks,
  sidebarOpen, setSidebarOpen, studentInfo, books }) => {

  const navigate = useNavigate();
  const [modelShow, setModelShow] = useState(false)

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [isbn, setIsbn] = useState("");
  const [err, setErr] = useState("")

  return (
    <aside className={sidebar \${sidebarOpen ? 'open' : 'closed'}}>
      <div className="sidebar-header">
        <h2>📚  {sidebarOpen ? "LibHub" : ''}</h2>
        <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>
      <ToastContainer />
      <nav className="sidebar-nav">
        <button
          className={nav-item \${currentPage === 'dashboard' ? 'active' : ''}}
          onClick={() => setCurrentPage('dashboard')}
        >
          <span className="icon">📊</span>
          {sidebarOpen && <span>Dashboard</span>}
        </button>
        <button
          className={nav-item \${currentPage === 'browse' ? 'active' : ''}}
          onClick={() => setCurrentPage('browse')}
        >
          <span className="icon">🔍</span>
          {sidebarOpen && <span>Browse Books</span>}
        </button>

        {localStorage.getItem("credentials") === "student" ? <>
          <button
            className={nav-item \${currentPage === 'borrowed' ? 'active' : ''}}
            onClick={() => setCurrentPage('borrowed')}
          >
            <span className="icon">📖</span>
            {sidebarOpen && <span>
              My Books ({!studentInfo.activeBorrows ? 0 : studentInfo.activeBorrows.length})</span>}
          </button>
          <button
            className={nav-item \${currentPage === 'profile' ? 'active' : ''}}
            onClick={() => setCurrentPage('profile')}
          >
            <span className="icon">👤</span>
            {sidebarOpen && <span>Profile</span>}
          </button>
        </>
          : <> <button
            className={nav-item \${currentPage === 'addbook' ? 'active' : ''}}
            onClick={() => {
              setModelShow(true)
              setCurrentPage('addbook')
            }}
          >
            <span className="icon">📖</span>
            Add New Book</button>
            <button
              className={nav-item \${currentPage === 'browsestudent' ? 'active' : ''}}
              onClick={() => {
              
                setCurrentPage('browsestudent')
              }}
            >
              <span className="icon">📖</span>
              Browse Student</button></>
        }
      </nav>

      {modelShow && <div className="modal-overlay" >
        <div className="modal-content" style={{ width: "600px", textAlign: "left" }}>
          <center><h3>Add New Book</h3></center>
          <div className="input-groupmodel" >
            <label>Enter Title</label>
            <input
              id="title"
              type="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}

              required
            />
          </div>
          <div className="input-groupmodel">
            <label>Enter Author</label>
            <input
              id="author"
              type="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}

              required
            />
          </div>
          <div className="input-groupmodel">
            <label>Enter Category</label>
            <input
              id="category"
              type="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}

              required
            />
          </div>
          <div className="input-groupmodel">
            <label>Enter Year</label>
            <input
              id="year"
              type="year"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}

              required
            />
          </div>
          <div className="input-groupmodel">
            <label>Enter Isbn</label>
            <input
              id="isbn"
              type="isbn"
              name="isbn"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
          </div>
          <div><p style={{ color: "red" }}>{err}</p></div>
          <div className="modal-actions"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "20px"
            }}>
            <button className="setting-btn"
              onClick={() => {
                setModelShow(false)
                setTitle("")
                setAuthor("")
                setCategory("")
                setIsbn("")
                setYear("")
              }}
            >Cancle
            </button>
            <button className="setting-btn"
              onClick={async () => {
                if (!title || !author || !category || !isbn || !year) {
                  setErr("Enter all details...")
                }
                else {
                  const formData = {
                    id: books.length,
                    title: title,
                    author: author,
                    category: category,
                    isbn: "978 -" + isbn,
                    year: year,
                    available: []
                  }
                  //console.log("formdat",formData)
                  await axios.post("http://localhost:8000/api/create",
                    formData)
                    .then((response) => {
                      toast.success("successfully updated Profile");
                      setModelShow(false)
                      setTitle("")
                      setAuthor("")
                      setCategory("")
                      setIsbn("")
                      setYear("")
                      setCurrentPage('browse')
                      window.location.reload()
                    })
                    .catch(error => { console.log("errr", error) })

                }
              }}
            >Add Book
            </button>
          </div>
        </div>
      </div>
      }
      <div className="sidebar-footer">

        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("studentId")
          localStorage.removeItem("studentPersonalId")
          localStorage.removeItem("AdminDetail")
          navigate('/')
        }} >

          <span className="icon">🚪</span>
          {sidebarOpen && <span>Logout</span>}


        </button>

      </div>
    </aside>

  )
}

export default Sidebar`
  },
  {
    fileName: "client/studentComponent/StudentLibraryStyles.css",
    code: `
/* ==================== GLOBAL STYLES ==================== */

:root {
  /* Colors */
  --primary-color: #4f46e5;
  --primary-dark: #4338ca;
  --primary-light: #6366f1;
  --accent-color: #06b6d4;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  
  /* Text Colors */
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-light: #9ca3af;
  --text-white: #ffffff;
  
  /* Background Colors */
  --bg-white: #ffffff;
  --bg-light: #f9fafb;
  --bg-gray: #f3f4f6;
  --bg-dark: #1f2937;
  --bg-darker: #111827;
  
  /* Borders */
  --border-color: #e5e7eb;
  --border-light: #f3f4f6;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  color: var(--text-primary);
  background-color: var(--bg-light);
  line-height: 1.6;
}

/* ==================== LOGIN PAGE ==================== */

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.login-page::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -100px;
  right: -100px;
  animation: float 6s ease-in-out infinite;
}

.login-page::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  bottom: -100px;
  left: -100px;
  animation: float 8s ease-in-out infinite 2s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
}

.login-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  padding: 20px;
}

.login-box {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.login-header p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.form-group input {
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.95rem;
  transition: var(--transition);
  background-color: var(--bg-white);
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.login-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 10px;
  box-shadow: var(--shadow-lg);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
}

.login-footer {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* ==================== APP LAYOUT ==================== */

.app-container {
  display: flex;
  min-height: 100vh;
  background: var(--bg-light);
}

/* ==================== SIDEBAR ==================== */

.sidebar {
  width: 260px;
  background: white;
  border-right: 1px solid var(--border-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: width 0.3s ease;
  position: relative;
}

.sidebar.closed {
  width: 100px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 10px;
}

.sidebar-header h2 {
  font-size: 1.5rem;
  color: var(--primary-color);
  white-space: nowrap;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 5px;
  border-radius: 6px;
  transition: var(--transition);
}

.toggle-btn:hover {
  background: var(--bg-light);
  color: var(--primary-color);
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: none;
  border: none;
  border-radius: 8px;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
  font-size: 0.95rem;
}

.nav-item:hover {
  background: var(--bg-light);
  color: var(--primary-color);
}

.nav-item.active {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  box-shadow: var(--shadow-md);
}

.nav-item .icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.sidebar-footer {
  margin-top: auto;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--danger-color);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}

.logout-btn:hover {
  background: #dc2626;
}

/* ==================== MAIN CONTENT ==================== */

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  background: white;
  border-bottom: 1px solid var(--border-color);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--primary-color);
}

.header-left h1 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-weight: 600;
  color: var(--text-primary);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 7px;
}

.page {
  max-width: 1400px;
  margin: 0 auto;
}

/* ==================== DASHBOARD PAGE ==================== */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
  margin-bottom: 15px;
}

.stat-card {
  background: white;
  padding: 10px;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.stat-content h3 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.stat-content p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.dashboard-section {
  background: white;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  min-height: 150px;
  box-shadow: var(--shadow-md);
}

.dashboard-section h2 {
  font-size: 1.25rem;
  margin-bottom: 5px;
  color: var(--text-primary);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.activity-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  background: var(--bg-light);
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
  transition: var(--transition);
}

.activity-item:hover {
  background: var(--bg-gray);
}

.activity-info h4 {
  margin-bottom: 4px;
  color: var(--text-primary);
}

.activity-info .author {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.activity-info .date {
  font-size: 0.85rem;
  color: var(--warning-color);
  margin-top: 4px;
}

.return-btn {
  padding: 8px 16px;
  background: var(--danger-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.return-btn:hover {
  background: #dc2626;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.chart-card {
  background: var(--bg-light);
  padding: 20px;
  border-radius: 8px;
}

.chart-card h3 {
  margin-bottom: 20px;
  color: var(--text-primary);
}

.category-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-row span:first-child {
  min-width: 70px;
  font-weight: 500;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  transition: width 0.3s ease;
}

.stat-row .count {
  min-width: 30px;
  text-align: right;
  font-weight: 600;
  color: var(--primary-color);
}

.pie-chart {
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: center;
}

.pie-item {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.pie-item.available {
  background: linear-gradient(135deg, var(--success-color), #059669);
}

.pie-info p {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.available-dot {
  background: var(--success-color);
}

.borrowed-dot {
  background: var(--warning-color);
}

/* ==================== BROWSE BOOKS PAGE ==================== */

.search-filter-section {
  margin-bottom: 30px;
}

.search-input {
  width: 100%;
  padding: 14px 20px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 20px;
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.filter-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 20px;
  background: white;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}

.book-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.book-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.book-cover {
  position: relative;
  height: 150px;
  overflow: hidden;
  background: var(--bg-light);
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-size: 3rem;
}

.availability-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
}

.availability-badge.available {
  background: var(--success-color);
  color: white;
}

.availability-badge.borrowed {
  background: var(--warning-color);
  color: white;
}

.book-info {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.book-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
  line-height: 1.3;
}

.book-author {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 10px;
}

.book-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.75rem;
}

.category {
  background: var(--primary-color);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
}

.year {
  color: var(--text-secondary);
  padding: 2px 0;
}

.isbn {
  font-size: 0.75rem;
  color: var(--text-light);
  font-family: monospace;
}

.book-actions {
  padding: 16px;
  border-top: 1px solid var(--border-color);
}

.borrow-btn {
  width: 100%;
  padding: 10px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.borrow-btn:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-lg);
}

.borrowed-btn {
  width: 100%;
  padding: 10px;
  background: var(--bg-gray);
  color: var(--text-secondary);
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: not-allowed;
}

/* ==================== MY BORROWED BOOKS PAGE ==================== */

.borrowed-books-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.borrowed-book-item {
  background: white;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 20px;
  align-items: center;
  transition: var(--transition);
}

.borrowed-book-item:hover {
  box-shadow: var(--shadow-lg);
}

.borrowed-book-cover {
  height: 100px;
}

.borrowed-book-cover .cover-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  font-size: 2rem;
}

.borrowed-book-details h3 {
  font-size: 1.15rem;
  margin-bottom: 2px;
  color: var(--text-primary);
}

.borrowed-book-details .author {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 5px;
}

.dates {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.dates p {
  color: var(--text-secondary);
}

.dates .due-date.overdue {
  color: var(--danger-color);
  font-weight: 600;
}

.isbn {
  font-size: 0.8rem;
  color: var(--text-light);
  font-family: monospace;
}

.empty-state-large {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-state-large h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.empty-state-large p {
  color: var(--text-secondary);
  margin-bottom: 30px;
}

.browse-btn {
  padding: 12px 30px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.browse-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* ==================== PROFILE PAGE ==================== */

.profile-card {
  background: white;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.profile-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  padding: 10px 4px;
  text-align: center;
}

.profile-avatar {
  font-size: 4rem;
  margin-bottom: 6px;
}

.profile-header h2 {
  font-size: 1.75rem;
  margin: 0;
}

.profile-content {
  padding: 20px 24px;
}

.profile-section {
  margin-bottom: 10px;
}

.profile-section h3 {
  font-size: 1.15rem;
  margin-bottom: 5px;
  color: var(--text-primary);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border-color);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.info-item label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 6px;
  font-weight: 600;
}

.info-item p {
  font-size: 1rem;
  color: var(--text-primary);
}

.stats-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  text-align: center;
}

.stat-column .stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.stat-column p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.settings-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.setting-btn {
  padding: 12px 20px;
  background: var(--bg-light);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.setting-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.setting-btn.delete-btn {
  border-color: var(--danger-color);
  color: var(--danger-color);
}

.setting-btn.delete-btn:hover {
  background: var(--danger-color);
  color: white;
}

/* ==================== RESPONSIVE DESIGN ==================== */

@media (max-width: 1024px) {
  .sidebar {
    width: 200px;
  }

  .sidebar.closed {
    width: 70px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  .borrowed-book-item {
    grid-template-columns: 80px 1fr auto;
    gap: 16px;
  }

  .borrowed-book-cover .cover-placeholder {
    width: 80px;
    height: 110px;
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: auto;
    border-right: none;
    border-top: 1px solid var(--border-color);
    padding: 12px;
    z-index: 100;
  }

  .sidebar.closed {
    width: 100%;
  }

  .sidebar-header {
    margin-bottom: 0;
  }

  .sidebar-nav {
    display: none;
  }

  .sidebar-footer {
    margin-top: 0;
  }

  .main-content {
    margin-bottom: 70px;
  }

  .header {
    padding: 12px 16px;
  }

  .menu-toggle {
    display: block;
  }

  .header-left h1 {
    font-size: 1.25rem;
  }

  .user-name {
    display: none;
  }

  .content-area {
    padding: 16px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .stat-card {
    padding: 16px;
    gap: 12px;
  }

  .stat-icon {
    font-size: 2rem;
  }

  .stat-content h3 {
    font-size: 1.5rem;
  }

  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .borrowed-book-item {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .borrowed-book-cover {
    width: 100%;
    height: 150px;
  }

  .borrowed-book-cover .cover-placeholder {
    width: 100%;
  }

  .filter-buttons {
    gap: 8px;
  }

  .filter-btn {
    font-size: 0.85rem;
    padding: 8px 14px;
  }

  .profile-header {
    padding: 30px 16px;
  }

  .profile-content {
    padding: 24px 16px;
  }

  .profile-avatar {
    font-size: 3rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .header-left h1 {
    font-size: 1.1rem;
  }

  .stat-card {
    flex-direction: column;
    text-align: center;
  }

  .stat-icon {
    font-size: 2.5rem;
  }

  .stat-content h3 {
    font-size: 1.5rem;
  }

  .books-grid {
    grid-template-columns: 1fr;
  }

  .book-card {
    max-width: 100%;
  }

  .login-box {
    padding: 24px;
  }

  .dashboard-section {
    padding: 6px;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }

  .pie-chart {
    flex-direction: column;
    gap: 20px;
  }

  .dates {
    flex-direction: column;
    gap: 8px;
  }

  .profile-header {
    padding: 24px 16px;
  }

  .profile-avatar {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }

  .settings-buttons {
    grid-template-columns: 1fr;
  }
}

/* ==================== SCROLLBAR STYLING ==================== */

.content-area::-webkit-scrollbar {
  width: 8px;
}

.content-area::-webkit-scrollbar-track {
  background: var(--bg-light);
}

.content-area::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

.content-area::-webkit-scrollbar-thumb:hover {
  background: var(--text-light);
}

/* ==================== ANIMATIONS ==================== */

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Print Styles */
@media print {
  .sidebar,
  .header,
  .menu-toggle,
  .logout-btn,
  .return-btn,
  .borrow-btn {
    display: none;
  }

  .main-content {
    margin: 0;
    width: 100%;
  }

  .content-area {
    padding: 0;
  }
}


/* Overlay to dim the background */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Modal box styling */
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


.input-groupmodel {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.input-groupmodel input {
  padding: 0.8rem;
  margin-top: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

`
  },
  {
    fileName: "client/studentComponent/browseStudent.css",
    code: `
.student-container {
  padding: 2rem;
  background-color: #f9fbfd;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.add-btn {
  background-color: #2563eb;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.table-responsive {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.student-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.student-table th {
  background-color: #f1f5f9;
  padding: 1rem;
  font-weight: 600;
  color: #475569;
}

.student-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #1e293b;
}

.badge-count {
  background: #e0f2fe;
  color: #0369a1;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-weight: bold;
}

.status-pill {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
}

.status-pill.active { background: #dcfce7; color: #166534; }
.status-pill.suspended { background: #fee2e2; color: #991b1b; }

.actions button {
  margin-right: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  background: white;
  cursor: pointer;
  transition: 0.2s;
}

.view-btn:hover { background: #f8fafc; border-color: #2563eb; color: #2563eb; }`
  },
  {
    fileName: "client/studentComponent/",
    code: `
PORT=8000
MONGOURL= //Your MongoDB url
JWT_SECRET=dfjhhregherkjgdffwywrweuite
NODE_ENV=production
CLIENT_URL=https://library-management-mern-git.vercel.app
`
  },
  {
    fileName: "client/App.js",
    code: `
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LandingPage from './LandingComponent/LandingPage';
import StudentLibraryManagement from './studentComponent/Main';
import Login from './LandingComponent/Login';
import CreateStudent from './LandingComponent/CreateStudent';


const route = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <CreateStudent />,
  },
  {
    path: "/home",
    element: <StudentLibraryManagement />,
  },

])

const App = () => {
  return (
    <RouterProvider router={route}>
    </RouterProvider>
  );
}

export default App;`
  },
  {
    fileName: "client/index.js",
    code: `
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();`
  }
];

function CodeSlider() {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <div style={{ width: "85%", margin: "30px auto" }}>
      <h1 style={{ textAlign: "center" }}>
        MERN Project - 1 (Library Managment)
      </h1>
      <div className="slider-container">
        <Slider {...settings}>
          {files.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  padding: "30px",
                  background: "#282c34",
                  borderRadius: "20px"
                }}
              >
                <h2 style={{ color: "white" }}>
                  {item.fileName}
                </h2>

                <pre
                  style={{
                    color: "#61dafb",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",

                  }}
                >
                  <code>{item.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </Slider></div>
    </div>
  );
}

export default CodeSlider;