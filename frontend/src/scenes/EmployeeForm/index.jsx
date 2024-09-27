
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "@/components/FlexBetween";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const EmployeeRegisterSchema=yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  mobileNo:yup.string().matches(phoneRegExp, 'Phone number is not valid').required("required"),
  designation: yup.string().required("required"),
  course: yup.string().required("required"),
  picture: yup.string().required("required"),
})
const initialValuesRegister = {
  name:"",
  email: "",
  mobileNo: "",
  designation: "",
  gender: "",
  course:"",
  picture: "",
};

function EmployeeForm() {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isNonMobileScreens=useMediaQuery("(min-width:1000px)");
  return (
    <Box p="1rem">
     <Typography variant="h2" color="textPrimary" fontWeight="regular">Create Employee</Typography>
    <Formik 
    initialValues={initialValuesRegister}
    validationSchema={EmployeeRegisterSchema}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      })=>(
        
        <form onSubmit={handleSubmit}
        >
        <Box
          p="1rem"
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? "span 4" : "span 4" },
          }}
        >
              <TextField
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={
                  Boolean(touched.name) && Boolean(errors.name)
                }
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              
              
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Mobile No"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mobileNo}
                name="mobileNo"
                error={
                  Boolean(touched.mobileNo) && Boolean(errors.mobileNo)
                }
                helperText={touched.mobileNo && errors.mobileNo}
                sx={{ gridColumn: "span 4" }}
              />
               <TextField
                label="Designation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.designation}
                name="designation"
                error={
                  Boolean(touched.designation) && Boolean(errors.designation)
                }
                helperText={touched.designation && errors.designation}
                sx={{ gridColumn: "span 4" }}
              />
               <TextField
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={
                  Boolean(touched.gender) && Boolean(errors.gender)
                }
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 4" }}
              />
               <TextField
                label="Course"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.course}
                name="mobileNo"
                error={
                  Boolean(touched.course) && Boolean(errors.course)
                }
                helperText={touched.course && errors.course}
                sx={{ gridColumn: "span 4" }}
              />
              <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
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
              </Box>
            </Box>
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
              Submit
            </Button>

            </form>
          )}

    </Formik>
    </Box>
  )
  
}

export default EmployeeForm