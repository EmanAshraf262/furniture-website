// const express = require('express');
import express from 'express';

// dotenv config wali line ko express ka nichy hi likty ha warna error aye ga or db.js ma bi ya line lagani parry gi 
import 'dotenv/config';

// const cors = require('cors');
import cors from 'cors';
import db from './database/db.js';
import jwt from 'jsonwebtoken';

const app = express();
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/v1/test', productRouter);
app.use('/api/v1/cart', cartRouter)







// details ki api 
app.get('/api/v1/product/:id', (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM products WHERE id=?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Something went wrong"
            });
        }

        if (result.length == 0) {
            return res.status(404).json({
                status: false,
                message: "Product not found"
            });
        }

        res.json({
            status: true,
            message: "Product detail",
            product: result[0]   // 👈 single object, array nahi
        });
    });
});








app.post('/api/v1/user/register', (req, res) => {

    const {
        email,
        name,
        phone,
        passward,
        gender,
        address
    } = req.body;

    const sql = "INSERT INTO users (email,name,phone,passward,gender,address,created_at) VALUE(?,?,?,?,?,?,NOW())";
    db.query(sql, [email, name, phone, passward, gender, address], (err, result) => {


        if (err) {
            res.json({
                status: false,
                message: "Something went wrong!!" + err
            });

        } else {
            res.json({
                "status": true,
                "message": "user registered!!",


            });
        }





    });
});


app.post('/api/v1/user/login', (req, res) => {
    const { email, pass } = req.body;

    // validation input
    if (!email || !pass) {

        return res.status(400).json({
            status: false,
            message: "Email and passard are required."
        });
    }

    const sql = "SELECT id,name,email FROM users WHERE email=? AND passward=?";
    db.query(sql, [email, pass], (err, result) => {

        if (err) {
            res.json({

                status: false,
                message: "Something went wrong!!"
            });

            return;
        }

        if (result.length == 0) {
            res.json({
                status: false,
                message: "ivalid credentials!!"
            });

            return;
        }
        const token = jwt.sign(

            {
                id: result[0].id,
                email: result[0].email,
                name: result[0].name

            },
            process.env.JWT_SECRET,
            {
                expiresIn:"2d"
            }

        );


        res.json({
            status: true,
            message: "user data",
            token:token,
            user: result[0]
        });



    });




});

app.put('/api/v1/user/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, address, phone, gender } = req.body
    if (!name || !address || !phone || !gender) {
        return res.status(400).json(
            {

                status: false,
                message: "name/address/phone/gender are required "
            }
        );

    }
    const sql = "UPDATE users SET name=? ,address=? , phone=?,gender=?,updated_at=NOW() WHERE id=?";
    db.query(sql, [name, address, phone, gender, id], (err, result) => {

        if (err) {
            res.status(500).json({
                status: false,
                message: "something went wrong"
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "user record updated",

        });

    });

});


// app.post('/api/v1/cart/add',);

// // api/v1/cart/2   
// app.post('/api/v1/cart/:userId', );





app.listen(process.env.PORT, () => {
    console.log('Server is Running ');
});