import { Box, useMediaQuery, useTheme,
  Card, 
  CardMedia,
  CardContent,
  Typography,
  CardActionArea, } from "@mui/material";
import Navbar from '@/scenes/Navbar'
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
 
  return (
 
    <Box>
       <Box 
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        
        
    sx={{ 
      p:"3rem",
      gap: 6, // Adjust gap for spacing between cards
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' // Responsive grid layout
    }}
  >
    <Typography variant="h2" color="textPrimary" fontWeight="regular">Welcome To Admin Panel</Typography>
    <Card sx={{ maxWidth: 345}}    onClick={() => navigate("/employeeList")}>
      <CardActionArea sx={{backgroundColor:"lightblue"}}> 
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Add Employee
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>

    <Card sx={{ maxWidth: 345 }} onClick={() => navigate("/employeeTable")}>
      <CardActionArea sx={{backgroundColor:"lightblue"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Emloyee List
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea sx={{backgroundColor:"lightblue"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Update Employee details
          </Typography>
        
        </CardContent>
      </CardActionArea>
    </Card>

    {/* Add more cards as needed */}
  </Box>
    </Box>
  )
}

export default Dashboard