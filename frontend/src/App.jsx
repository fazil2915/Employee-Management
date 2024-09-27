import { useMemo } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { CssBaseline,ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Login from '@/scenes/Login';
import Dashboard from '@/scenes/Dashboard';
import EmployeeForm from '@/scenes/EmployeeForm';
import Layout from './scenes/layout';
import { themeSettings } from './theme';
function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <BrowserRouter>
     <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Routes>
    <Route index element={<Login/>}/>
    <Route path='/' element={<Layout/>}>

      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/employeeList' element={<EmployeeForm/>}/>
      </Route>
    </Routes>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
