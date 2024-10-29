// import {v2 as cloudinary} from "cloudinary"
// import fs from "fs"

// // Configuration
// cloudinary.config({ 
//     cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    
//     api_key:process.env.CLOUDINARY_API_KEY , 
//     api_secret: process.env.CLOUDINARY_SECRET_KEY // Click 'View API Keys' above to copy your API secret
// });

// const uploadOnCloudinary = async(localFilePath) => {
//     try {
//         if(!localFilePath) return null
//         //upload file on cloudinary
//        const response = await cloudinary.uploader.upload(localFilePath,{
//             resource_type:"auto"
//         })
//         //file has been uploaded sucessfull
//         console.log("file is uploaded on cloudinary",response.url);
//         return response;
//       } catch (error) {
//         fs.unlinkSync(localFilePath) //remove the locally saved temporary file as upload
//         return null;
//     }

// }

// export {uploadOnCloudinary};

// const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);

 import path from 'path';
 import express from 'express';
 import multer from 'multer';
 import fs from 'fs';

// const path = require("path");
// const express = require("express");
// const upload = multer({dest:"uploads/"});
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./uploads");

    },
    filename:function(req,file,cb){
        const ext = path.extname(file.originalname);
        return cb(null,`${Date.now()}-${file.originalname} `);
    },
});
const fileFilter = (req, file, cb) => {
    // Only accept jpg/jpeg files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type, only JPG is allowed!'), false); // Reject the file
    }
};
const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Optional: limit file size to 5MB
});
//const upload = multer({ storage });
const app =express();
const PORT = 8000;
// app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get("/",(req,res) => {
    return res.render("homepage");

});
app.post("/upload",upload.single('file'),(req,res) => {
    console.log(req.body);
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    // Create the download link for the uploaded file
    const downloadLink = `${req.protocol}://${req.get('host')}/download/${req.file.filename}`;
    
    return res.send(`File uploaded successfully. <a href="${downloadLink}">Download here</a>`);

   // return res.redirect("/");
});
app.get("/download/:filename", (req, res) => {
    const filePath = path.join("C:/Users/Bhaskar Samanta/Desktop/Projectnew/uploads", 'uploads', req.params.filename);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send("File not found!");
        }
        // File exists, proceed to download
        return res.download(filePath);
    });
});

app.listen(PORT, () => console.log(`Server started running  at PORT 8000`));