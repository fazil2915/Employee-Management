import {Box, Typography,useTheme,useMediaQuery} from "@mui/material";
import Form from './Form'
function Login() {
  const theme = useTheme()
  const isNonMobileScreens=useMediaQuery("(min-width:1000px)");
  return (
    <Box>
    <Box width="100%" backgroundColor={theme.palette.background.alt}
    p="1rem" textAlign="center">
    <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          >
          Employee Management Panel
        </Typography>
    </Box>
    <Box
  width={isNonMobileScreens? "50%" : "90%"}
    p="2rem"
    m="2rem auto"
    borderRadius="1.5rem"
    backgroundColor={theme.palette.background.alt}>
        <Typography fontWeight="500" variant="h5" sx={{mb:"1rem"}}>
        Welcome to Admin Login
        </Typography>
       <Form/>
    </Box>
</Box>
    
  )
}

export default Login