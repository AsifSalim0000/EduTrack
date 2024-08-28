import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HeaderNavbar from './components/HeaderNavbar';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <HeaderNavbar />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
