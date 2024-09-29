import Employee from '../models/employee.js'
import { v2 as cloudinary } from 'cloudinary';
export const createEmployee=async (req,res)=>{
    try {
        const {
            name,
            email,
            phone,
            designation,
            gender,
            course
            
        }=req.body;

        const file = req.file;
        const pictureUrl = file.path;  
        const newEmployee=new Employee({
            name,
            email,
            phone,
            designation,
            gender,
            course,
            picture:pictureUrl
        })
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getEmployees=async(req, res) => {
try {
   
    const employee=await Employee.find()

    if(!employee) return res.status(404).json({message: 'Employee not found'});
    res.status(200).json(employee);
} catch (error) {
    res.status(500).json({message: error.message});
}
}

export const getSingleEmployee=async (req, res) =>{
    try {
        const {id}=req.params
        const employee=await Employee.findById(id)
        if(!employee) return res.status(404).json({message: 'Employee not found'});

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({message: error.message});  
    }
}


export const updateEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params; 
        const { 
            name, 
            email, 
            phone, 
            designation, 
            gender, 
            course 
        } = req.body;

        const file = req.file;
        const pictureUrl = file.path; 
        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId, 
            {
                name,
                email,
                phone,
                designation,
                gender,
                course,
                picture:pictureUrl
            }, 
            { new: true, runValidators: true } // new: true returns the updated document
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({
            message: "Employee updated successfully",
            data: updatedEmployee
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const deleteEmployee = async (req, res) => {
    const {id}=req.params

    const employee=await Employee.findById(id)
    if(!employee) return res.status(404).json({message: 'Employee not found'});

    const deletedEmployee= await Employee.deleteOne(employee);

    if(!deletedEmployee) return res.status(500).json({message: 'Failed to delete employee'});
    
    res.status(200).json({message: 'Successfully deleted employee'});
} 