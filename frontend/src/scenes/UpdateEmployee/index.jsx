import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box, Button, TextField, Typography, MenuItem,
    FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, useTheme
} from '@mui/material';
import { useAccessProtectedRoute } from '../../helper/token';
import Dropzone from "react-dropzone";
import FlexBetween from "@/components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

// Define the validation schema
const EmployeeRegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    designation: Yup.string().required("Designation is required"),
    gender: Yup.string().required("Gender is required"),
    course: Yup.string().required("Course is required"),
});

// Fetch function outside the component
const fetchEmployeeData = async (id, accessProtectedRoute) => {
    try {
        const response = await accessProtectedRoute(`${import.meta.env.VITE_BASE_URL}/api/admin/getSingleEmployee/${id}`, {
            method: "GET",
        });
        return response;
    } catch (error) {
        console.error("Error fetching employee data:", error);
        return null;
    }
};

const EditEmployee = () => {
    const { id } = useParams(); // Extracting the ID from the URL parameters
    const accessProtectedRoute = useAccessProtectedRoute();
    const { palette } = useTheme();
    const navigate = useNavigate()

    // Define local state to store fetched data
    const [initialValuesRegister, setInitialValuesRegister] = useState({
        name: '',
        email: '',
        phone: '',
        designation: '',
        gender: '',
        course: '',
        picture: '',
    });

    const handleFormSubmit = async (values) => {
        const formData = new FormData();
    
        // Append fields to formData
        for (let key in values) {
            if (key === "picture" && values.picture) {
                formData.append("picture", values.picture);
            } else if (key !== "picture") {
                // Append all other fields
                formData.append(key, values[key]);
            }
        }
    
        // If no new picture is provided, include the old picture URL
        if (!values.picture) {
            formData.append("picture", initialValuesRegister.picture);
        }
    
        try {
            const response = await accessProtectedRoute(`${import.meta.env.VITE_BASE_URL}/api/admin/updateEmployee/${id}`, {
                method: "PATCH",
                body: formData,
            });
            alert("Employee updated successfully");
            navigate('/employeeTable');
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Failed to update employee.");
        }
    };


    const fetchData = useCallback(async () => {
        const data = await fetchEmployeeData(id, accessProtectedRoute);
        if (data) {
            setInitialValuesRegister({
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                designation: data.designation || '',
                gender: data.gender || '',
                course: data.course || '',
                picture: data.picture || '',
            });
        }
    }, [id, accessProtectedRoute]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box m="20px">
            <Typography variant="h2" color="textPrimary" fontWeight="regular" ml="20px">Edit Employee</Typography>

            <Formik
                initialValues={initialValuesRegister}
                enableReinitialize={true}
                validationSchema={EmployeeRegisterSchema}
                onSubmit={handleFormSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            margin="normal"
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            margin="normal"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            margin="normal"
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                        />
                        <TextField
                            select
                            label="Designation"
                            name="designation"
                            value={values.designation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            margin="normal"
                            error={touched.designation && Boolean(errors.designation)}
                            helperText={touched.designation && errors.designation}
                        >
                            <MenuItem value="Hr">HR</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
                            <MenuItem value="Salesman">Salesman</MenuItem>
                        </TextField>
                        <FormControl sx={{ gridColumn: "span 4" }}>
                            <FormLabel id="gender-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="gender-label"
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                                row
                            >
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel value="Other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            select
                            label="Course"
                            name="course"
                            value={values.course}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            margin="normal"
                            error={touched.course && Boolean(errors.course)}
                            helperText={touched.course && errors.course}
                        >
                            <MenuItem value="MCA">MCA</MenuItem>
                            <MenuItem value="BCA">BCA</MenuItem>
                            <MenuItem value="BSC">BSC</MenuItem>
                        </TextField>
                        <Box>
                            <img
                                src={values.picture}
                                alt="employee"
                                style={{ width: "50px", height: "70px", borderRadius: "50%" }}
                            />
                        </Box>

                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) => {
                                if (acceptedFiles && acceptedFiles.length > 0) {
                                    setFieldValue("picture", acceptedFiles[0]);
                                }
                            }}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!values.picture ? (
                                        <p>Add Picture Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{values.picture.name}</Typography>
                                            <EditOutlinedIcon />
                                        </FlexBetween>
                                    )}
                                </Box>
                            )}
                        </Dropzone>

                        <Button variant="contained" color="primary" type="submit" sx={{ mt: "10px" }}>
                            Update Employee
                        </Button>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default EditEmployee;
