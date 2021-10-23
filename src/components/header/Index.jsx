import React, { useState, useEffect } from 'react';
import Select from "react-select";
import { AudioOutlined } from "@ant-design/icons";
import metamask from "../../metamask.svg";
import { Link, useLocation } from 'react-router-dom';
import "./style.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./style.css";
const Index = () => {
  const location = useLocation();

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "chocolate", label: "Chocolate" },
  ];
  const options2 = [
    { value: "SortBy", label: "SortBy" },
    { value: "High to Low", label: "High to Low" },
    { value: "vanilla", label: "Vanilla" },
    { value: "chocolate", label: "Chocolate" },
  ];
  const [selectedOption, setselectedOption] = useState(null);
  const [selectedOption2, setselectedOption2] = useState(null);
  const handleChange = (selectedValue) => {
    setselectedOption(selectedValue);
  };
  const handleChange2 = (selectedValue) => {
    setselectedOption2(selectedValue);
  };

  const [isClearable, setisClearable] = useState(true);
  const toggleClearable = () => setisClearable(!isClearable);

  const [isClearable2, setisClearable2] = useState(true);
  const toggleClearable2 = () => setisClearable2(!isClearable2);

  return (
    <>
      <div className="row">
        <div className="col-lg-10  col-md-8  col-sm-6 col-sm-4  offset-4  offset-sm-0  offset-lg-0 offset-md-0      ">
          <div className="header__logo "></div>
        </div>
        <div className="col-lg-2 col-sm-6  offset-5 mt-lg-0 mt-md-0 offset-sm-0 offset-lg-0 offset-md-0 col-md-4 text-center">
          <div className="header__wallet  ">
            <div className="header__wallet-network">
              <p> &nbsp;</p>
            </div>
            <div className="header__wallet-user">
              <div className="install-metamask">
                <a href="https://metamask.io/"></a>
                <div className="web3modal-provider-icon">
                  <img src={metamask} width="32px " height="32px" alt="" />
                </div>
                <div className="installMetaMask">Install Metamask</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}

      <div className="row my-5">
        <div className=" col-sm-6 col-md-6  col-lg-6   offset-sm-0   offset-3   offset-lg-0 offset-md-0       ">
          <div className="Navbar ">
            <ul className="d-lg-flex ">
            {
              
            }
              <Link to="/" style={{ textDecoration: " none" }}>
                {" "}
                <li
                  className={

                    location?.pathname == "/"
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

                    location?.pathname == "/lend"
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
                    location?.pathname == "/dashboard"
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
         location?.pathname == "/faq"
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
        <div className=" col-sm-4 col-lg-6  mt-sm-5 ms-sm-5 ms-lg-0 col-md-4 col-10   offset-4 mt-3 mt-lg-0 mt-md-0  offset-sm-0  offset-lg-0 offset-md-0         ">
          <div className="row    ">
            <div className="col-lg-5  navbarSelectMain   ">
              <div className="navbarSelect">
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={options}
                  isClearable={toggleClearable}
                />
              </div>
            </div>
            <div className="col-lg-5  navbarSelectMainX mt-3 mt-md-4 mt-lg-0   ">
              <div className="navbarSelect">
                <Select
                  value={selectedOption2}
                  onChange={handleChange2}
                  options={options2}
                  isClearable={toggleClearable2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
