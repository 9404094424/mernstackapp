import mongoose, { Schema } from 'mongoose';

const BlogPost = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    mobile: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        lowercase: true
    }
});

const contactModel = mongoose.model('contacts', BlogPost);

export default contactModel;