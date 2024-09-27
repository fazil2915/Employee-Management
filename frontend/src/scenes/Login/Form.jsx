import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem  
} from '@mui/material'
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state";

//form schema 
const loginSchema = yup.object().shape({
    userName: yup.string().required("required"),
    password: yup.string().required("required")
  
  });

const initialValueLogin={
    userName: '',
    password: '',
  
};

const Form=()=>{
const dispatch=useDispatch();
const { palette } = useTheme();
const isNonMobile = useMediaQuery("(min-width:600px)");

return (
    <Formik
    initialValues={initialValueLogin}
    validationSchema={loginSchema}
    >
        {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      })=>(
        <form >
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="User Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.userName}
              name="userName"
              error={Boolean(touched.userName) && Boolean(errors.userName)}
              helperText={touched.userName && errors.userName}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.dark },
                fontWeight:"bold",
                fontSize:"16px",
              }}
            >
              Login
            </Button>
            
          </Box>
        </form>
      )}

    </Formik>
)
}

export default Form;