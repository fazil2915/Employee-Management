import { useMemo } from 'react';
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import { CssBaseline,ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Login from '@/scenes/Login';
import Dashboard from '@/scenes/Dashboard';
import EmployeeForm from '@/scenes/EmployeeForm'; 
import EmployeeList from '@/scenes/EmloyeeList';
import EditEmployee from '@/scenes/UpdateEmployee';
import Layout from './scenes/layout';
import { themeSettings } from './theme';
import { useSelector } from 'react-redux';

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route index element={<Login />} />
          <Route path='/' element={<Layout />}>
            <Route 
              path='/dashboard' 
              element={isAuth ? <Dashboard /> : <Navigate to="/" />} 
            />
            <Route 
              path='/employeeList' 
              element={isAuth ? <EmployeeForm /> : <Navigate to="/" />} 
            />
            <Route 
              path='/employeeTable' 
              element={isAuth ? <EmployeeList /> : <Navigate to="/" />} 
            /> 
            <Route 
              path='/edit-employee/:id' 
              element={isAuth ? <EditEmployee /> : <Navigate to="/" />} 
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
