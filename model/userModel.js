//import mongoose
const mongoose = require('mongoose')

//create a db schema ref new mongoose.Schema(schema,collection)

const userSchema = new mongoose.Schema({
    name:{
        type:String, // data type
        required:true // mandatory field
    },
    email:{
        type:String,
        required:true,
        unique : true //unique value - will not allow duplicates
    },
    mobile:{
        type:String,  // if we have country code , so it must be string
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true // default value
    }
},{
    collection: 'users', // name of the collection
    timestamps:true //log the created and updated times in collection
})

module.exports = mongoose.model("user",userSchema) // model(export schema name, schema ref)