// this file is use for building connection with mongo db

const mongoose = require('mongoose')

const connectDB= async ()=>{
    try{
        const conn= await mongoose.connect('mongodb+srv://yashr:minorProject@booksmanagementsystem.qadmw.mongodb.net/BooksManagementSystem?retryWrites=true&w=majority&appName=BooksManagementSystem')
        console.log("database connected")
    }catch (error){
        console.log("error occured ", error)
        process.exit(1)
    }
};

module.exports =  connectDB