import { Box, useTheme, Button, Typography, TextField } from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useAccessProtectedRoute } from "../../helper/token";

function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Filtered employees
  const navigate = useNavigate();
  const { palette } = useTheme();
  const accessProtectedRoute = useAccessProtectedRoute();
  
  useEffect(() => {
    getEmployees();
  }, []);
  
  useEffect(() => {
    const result = employeeList.filter((employee) => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      employee.phone.includes(searchTerm) || 
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.course.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(result);
  }, [searchTerm, employeeList]);

  const getEmployees = async () => {
    try {
      const response = await accessProtectedRoute(`${import.meta.env.VITE_BASE_URL}/api/admin/getEmployees`, {
        method: "GET",
      });

      const mappedData = response.map(assess => {
        const slicedId = assess._id.slice(2, 6); 
        const created_At = format(new Date(assess.createdAt), 'MM/dd/yyyy');
        return {
          sliceId: slicedId,
          ...assess,
          id: slicedId,
          createdAt: created_At,
        };
      });

      setEmployeeList(mappedData);
      setFilteredEmployees(mappedData);

    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    try {
      const response = await accessProtectedRoute(`${import.meta.env.VITE_BASE_URL}/api/admin/deleteEmployee/${id}`, {
        method: "DELETE",
      });

      if (response.message === "Successfully deleted employee") {
        const updatedEmployeeList = employeeList.filter((employee) => employee._id !== id);
        setEmployeeList(updatedEmployeeList);
        setFilteredEmployees(updatedEmployeeList);
        alert("Employee deleted successfully");
      } else {
        throw new Error(response.message || "Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("An error occurred while deleting the employee.");
    }
  };

  const handleEditClick = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { 
      field: "picture", 
      headerName: "Picture",
      renderCell: (params) => (
        <img
          src={params.value}  
          alt="employee"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }} 
        />
      ),
    },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "course", headerName: "Course", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { 
      field: "actions", 
      headerName: "Actions", 
      flex: 1, 
      renderCell: (params) => (
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditClick(params.row._id)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteClick(params.row._id)}
          >
            Delete
          </Button>
        </Box>
      )
    },
  ];

  return (
    <Box m="20px">
      <Typography variant="h2" color="textPrimary" fontWeight="regular" ml="20px">Employee List</Typography>

      {/* Search Box */}
      <TextField
        label="Search Employees"
        variant="outlined"
        fullWidth
        sx={{ margin: "20px 0" }}
        onChange={(e) => setSearchTerm(e.target.value)} // Set the search term on input change
      />

      <Box
        mt="40px"
        height="75vh"
        maxWidth="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .name-column--cell": {
            color: palette.primary.light,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: palette.primary.light,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: palette.primary.main,
          },
          "& .MuiCheckbox-root": {
            color: `${palette.primary.main} !important`,
          },
          "& .MuiDataGrid-iconSeparator": {
            color: palette.primary.main,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${palette.primary.main} !important`,
          },
        }}
      >
        <DataGrid
          rows={filteredEmployees}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          checkboxSelection
        />
      </Box>
    </Box>
  );
}

export default EmployeeList;
