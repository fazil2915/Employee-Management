
import {
  Box,
  MenuItem,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch,useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "@/components/FlexBetween";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const EmployeeRegisterSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("required"),
  designation: yup.string().required("required"),
  course: yup.string().required("required"),
  picture: yup.string().required("required"),
})
const initialValuesRegister = {
  name: "",
  email: "",
  phone: "",
  designation: "",
  gender: "",
  course: "",
  picture: "",
};

function EmployeeForm() {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const token = useSelector((state) => state.token);

  const createEmployee = async (values, onSubmitProps) => {
    // Create FormData object to handle file and other form fields
    const formData = new FormData();
    
    // Append all form fields to FormData
    for (let key in values) {
      if (key === "picture") {
        formData.append("picture", values.picture); // Append the file directly
      } else {
        formData.append(key, values[key]);
      }
    }
    formData.append("picturePath", values.picture.name); 
    
    try {
      // Send FormData directly in the body
      const savedUserResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/employeeRegister`,
        {
          method: "POST",
          body: formData,  
          headers: { 
            Authorization: `Bearer ${token.accessToken}`,
            'x-refresh-token': `${token.requiredToken}`,
            // 'Content-Type': 'multipart/form-data' // No need to set this header manually with FormData
          },
        }
      );
      
      // Parse the response
      const savedUser = await savedUserResponse.json();
      
      // Reset the form if the user is saved
      if (savedUser) {
        onSubmitProps.resetForm();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleFormSubmit = async  (values, onSubmitProps) => {
    await createEmployee(values, onSubmitProps);
    console.log(values);
  };

  return (
    <Box p="1rem">
      <Typography variant="h2" color="textPrimary" fontWeight="regular">Create Employee</Typography>
      <Formik
        onSubmit={handleFormSubmit}
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
        }) => (

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
                value={values.phone}
                name="phone"
                error={
                  Boolean(touched.phone) && Boolean(errors.phone)
                }
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                select
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
              >
                <MenuItem value="Hr">HR</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Salesman">Salesman</MenuItem>
              </TextField>
              <FormControl
                error={Boolean(touched.gender) && Boolean(errors.gender)}
                sx={{ gridColumn: "span 4" }}
              >
                <FormLabel id="gender-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="gender-label"
                  name="gender"
                  value={values.gender}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  row // This will align the radio buttons horizontally; remove it for vertical alignment
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
                {touched.gender && errors.gender && (
                  <FormHelperText>{errors.gender}</FormHelperText>
                )}
              </FormControl>
              <TextField
                select
                label="Course"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.course}
                name="course"
                error={
                  Boolean(touched.course) && Boolean(errors.course)
                }
                helperText={touched.course && errors.course}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="MCA">MCA</MenuItem>
                <MenuItem value="BCA">BCA</MenuItem>
                <MenuItem value="BSC">BSC</MenuItem>
              </TextField>
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
                fontWeight: "bold",
                fontSize: "16px",
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