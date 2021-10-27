import React, { useState, useEffect } from 'react';
import Select from "react-select";
import { AudioOutlined ,SearchOutlined } from "@ant-design/icons";
import metamask from "../../metamask.svg";
import { Link, useLocation } from 'react-router-dom';
import { Input, Space } from 'antd';

import "./style.css";
const Index = () => {

  const { Search } = Input;
const onSearch = value => console.log(value);
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
  const location = useLocation();
    console.log(location)
  
  return (
    <>
     
 <nav class="navbar navbar-expand-lg navbar-light bg-light Navbarx   " 
     >
      <form class="form-inline my-2 ms-5 my-lg-0">
      <Input prefix={ <SearchOutlined   className="site-form-item-icon" />}  placeholder="Search Items ,Collection,and Accounts" allowClear onSearch={onSearch} style={{ width: 200 }} />
        
    </form>
    <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-5 ms-sm-4  ms-4 ms-lg-auto ">
      <li  className={location?.pathname==="/"? "nav-item active":"nav-item "}>
        <Link to="/" className="nav-link"  >RENT  </Link>
      </li>
      <li className={location?.pathname==="/lend"? "nav-item active":"nav-item "}>
        <Link to="/lend" className="nav-link"  >LEND</Link>
      </li>
      <li className={location?.pathname==="/lend_dashboard"? "nav-item active":"nav-item "}>
        <Link to="/lend_dashboard" className="nav-link" >LEND DASHBOARD</Link>
      </li>
      <li className={location?.pathname==="/rent_dashboard"? "nav-item active":"nav-item "}>
        <Link to="/rent_dashboard" className="nav-link" >RENT DASHBOARD</Link>
      </li>
      <li className={location?.pathname==="/faq"? "nav-item active":"nav-item "}>
        <Link to ="/faq" className="nav-link" >FAQ</Link>
      </li>
     
    </ul>
   
  </div>
</nav>
       
    
     
      {/* Navbar */}

      {/* <div className="row my-5">
        <div className=" col-sm-6 col-md-6  col-lg-6   offset-sm-0   offset-3   offset-lg-0 offset-md-0       ">
          <div className="Navbar ">
            <ul className="d-lg-flex ">
            {
              
            }
              <Link to="/" style={{ textDecoration: " none" }}>
                {" "}
                <li
                  className={
                    location.pathname == "/"
                      ? "navbarItem active mb-md-3 mb-lg-0 mb-3  mb-sm-3  "
                      : "navbarItem mb-md-3 mb-lg-0 mb-3"
                  }
                >
                  RENT
                </li>
              </Link>

              <Link to="/lend" style={{ textDecoration: " none" }}>
                <li
                  className={
                    location.pathname == "/lend"
                      ? "navbarItem active mb-md-3 mb-lg-0 mb-sm-3 mb-3"
                      : "navbarItem mb-md-3 mb-lg-0 mb-sm-3s mb-3"
                  }
                >
                  LEND
                </li>
              </Link>
              <Link to="/dashboard" style={{ textDecoration: " none" }}>
                <li
                  className={
                    location.pathname == "/dashboard"

                      ? "navbarItem active mb-md-3 mb-lg-0 mb-sm-3 mb-3"
                      : "navbarItem mb-md-3 mb-lg-0 mb-sm-3 mb-3"
                  }
                >
                  MY DASHBOARD
                </li>
              </Link>
              <Link to="/faq" style={{ textDecoration: " none" }}>
                <li
                  className={
                    location.pathname == "/faq"
                      ? "navbarItem active mb-md-3 mb-lg-0 mb-sm-3"
                      : "navbarItem mb-md-3 mb-lg-0 mb-sm-3"
                  }
                >
                  FAQ
                </li>
              </Link>
            </ul>
          </div>
        </div>
       
            
           
         
      </div> */}
    </>
  );
};

export default Index;
