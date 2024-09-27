import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Login from '@/scenes/Login';
import Dashboard from '@/scenes/Dashboard';
function App() {
 

  return (
    <BrowserRouter>
    <CssBaseline/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
