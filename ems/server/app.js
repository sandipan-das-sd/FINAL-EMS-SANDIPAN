const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Connection = require('./database/connection/db');
const UserModel = require('./database/model/User');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
const DeptModel=require('./database/model/Dept')
// const PortModel=require('./database/model/Port')
let corsAllow={
    origin:"http://localhost:3000",
    methods: "GET,PUT,POST,DELETE,PATCH,HEAD",
    credentials:true,



}
app.use(cors(corsAllow));

dotenv.config();
app.use(express.json());

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username, password);

app.get('/staffList', (req, res) => {
    UserModel.find({})
        .then(staffs => res.json(staffs))
        .catch(err => res.json(err))
});

app.get('/editStaff/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(staffs => res.json(staffs))
        .catch(err => res.json(err))
});



app.post('/addStaff', upload.single('userPhoto'), async (req, res) => {
    const userData = req.body;

    try {
        // Check if a department with similar details already exists
        const existingUser = await UserModel.findOne({
            $or: [
                { user_email: userData.user_email },
                { user_phone: userData.user_phone },
            ]
        });

        if (existingUser) {
            const duplicateFields = [];
            if (existingUser.user_email === userData.user_email) {
                duplicateFields.push('Email');
            }

            if (existingUser.user_phone === userData.user_phone) {
                duplicateFields.push('Phone number');
            }

            const errorMessage = `User with the same ${duplicateFields.join(' and ')} already exists`;
            return res.status(400).json({ error: errorMessage });
        }

        // Create a new staff member
        const newStaff = await UserModel.create(userData);


       

        res.status(201).json({
            message: 'Staff member added successfully',
            
            newStaff
        });
    } catch (error) {
        console.error('Error adding staff:', error);
        res.status(500).json({ error: 'Failed to add staff member' });
    }
});
app.get('/dashboardCount', async (req, res) => {
    try {
        const staffcount = await UserModel.countDocuments();
        const deptcount = await DeptModel.countDocuments();
        res.json({ staffcount, deptcount });
    } catch (error) {
        console.error('Error fetching counts:', error);
        res.status(500).json({ error: 'Failed to fetch counts' });
    }
});



app.post('/adddept', (req, res) => {
    const userData = req.body;

    // Check if a department with similar details already exists
    DeptModel.findOne({
        $or: [
            { deptName: userData.deptName },
            { deptID: userData.deptID },
        ]
    })
    .then(existingDept => {
        if (existingDept) {
            const duplicateFields = [];

            if (existingDept.deptName === userData.deptName) {
                duplicateFields.push('Department Name');
            }

            if (existingDept.deptID === userData.deptID) {
                duplicateFields.push('Department ID');
            }

            const errorMessage = `Department with the same ${duplicateFields.join(' and ')} already exists`;

            // Send a response with the error message and status code 400 (Bad Request)
            res.status(400).json({ error: errorMessage });
        } else {
            // Create a new department since no duplicate department found
            DeptModel.create(userData)
                .then(newDept => {
                    // Return the newly created department with status code 201 (Created)
                    res.status(201).json(newDept);
                })
                .catch(error => {
                    // Handle any errors during department creation
                    res.status(500).json({ error: 'Failed to add Department' });
                });
        }
    })
    .catch(err => {
        // Handle any internal server errors
        res.status(500).json({ error: 'Internal server error' });
    });
});
app.get('/manageDepartment', (req, res) => {
    DeptModel.find({})
        .then(depts => res.json(depts))
        .catch(err => res.json(err))
});


app.put('/updateStaffs/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body; 

    UserModel.findByIdAndUpdate(id, updatedData, { new: true })
        .then(staff => res.json(staff))
        .catch(err => res.status(500).json({ error: err.message }));
});


app.delete('/deleteStaff/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(staff => res.json(staff))
        .catch(err => res.status(500).json({ error: err.message }));
});
//delete department
app.delete('/deletedept/:id', (req, res) => {
    const id = req.params.id;
    DeptModel.findByIdAndDelete({ _id: id })
        .then(dept => res.json(dept))
        .catch(err => res.status(500).json({ error: err.message }));
});
//port number

app.get('/getPort', (req, res) => {
    // Fetch the port number
    Promise.resolve(process.env.PORT || 3001)
        .then(port => {
            // Send the port number as JSON response
            res.json({ port });
        })
        .catch(error => {
            // If there's an error, log it and send a default port number
            console.error('Error fetching port:', error);
            res.json({ port: 3001 });
        });
});

const PORT=process.env.PORT||3001;
app.listen(PORT, () => {
    console.log(`Server is running on port  ${PORT}`);
    console.log(process.env.PORT)
});
