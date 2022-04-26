import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './Layout.scss';

const Layout = ({children}) => {
  return (
      <>

        <Navbar></Navbar>
        <main>{children}</main>
        {/* <Footer></Footer> */}

      </>
    
    

    
  )
}

export default Layout