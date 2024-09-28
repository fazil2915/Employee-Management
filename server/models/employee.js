import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(\+\d{1,3}[- ]?)?\d{10}$/, // Regex for phone number
            'Please enter a valid phone number',
        ],
    },
    designation: {
        type: String,
        enum: ['Hr', 'Manager', 'Sales'], 
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'], 
        required: true,
    },
    course: {
        type: String,
        enum: ['MCA', 'BCA', 'BSC'], 
        required: true,
    },
    picture: {
        type: String,
        match: [
            /\.(jpg|jpeg|png)$/, // Regex to match common image file extensions
            'Please upload a valid image file (jpg, jpeg, png)',
        ],
        default: "",
    },
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
