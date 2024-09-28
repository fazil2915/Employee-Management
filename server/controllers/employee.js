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

// export const updateEmployee=async(req,res)=>{
//     try {
//         const {}
//     } catch (error) {
//         res.status(404).json({message: error.message});
//     }
// }