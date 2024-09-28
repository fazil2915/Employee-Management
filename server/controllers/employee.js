import Employee from '../models/employee.js'

export const createEmployee=async (req,res)=>{
    try {
        const {
            name,
            email,
            phone,
            designation,
            gender,
            course,
            picture
        }=req.body;

        const newEmployee=new Employee({
            name,
            email,
            phone,
            designation,
            gender,
            course,
            picture
        })
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getEmployees=async(req, res) => {
try {
   
    const employee=await Employee.find()

    if(!employee) return res.status(404).json({message: 'Employee not found'});
    res.status(200).json(employee);
} catch (error) {
    res.status(404).json({message: error.message});
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

        
        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId, 
            {
                name,
                email,
                phone,
                designation,
                gender,
                course
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