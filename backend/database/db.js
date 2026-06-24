import mongoose from "mongoose";


function dbConnection(){
    mongoose.connect('mongodb://127.0.0.1:27017/contactbook')
    .then(()=>{
        console.log("connect")
    })
    .catch((err)=>{
        console.log(err)
    })
    
}

export default dbConnection;