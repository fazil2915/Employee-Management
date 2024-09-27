import React from 'react';
import { Box, } from '@mui/material';
import Navbar from '@/scenes/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box>
      <Navbar />
        <Outlet />
    </Box>
  );
};

export default Layout;
