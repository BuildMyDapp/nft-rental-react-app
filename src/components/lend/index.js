import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { Pagination, List } from "antd";
import { Menu, Dropdown, Button, message, Space, Tooltip } from "antd";
import "./style-R.css";
import "./style.css";
import RentCard from "./card";
import { rentData } from "../../data/index";
import { useStore } from "../../context/GlobalState";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
const Lend = () => {
  const pageSize = 8;
  const [{ web3, accounts, contract, apiUrl }, dispatch] = useStore();


  const [rentStateData, setRentStateData] = useState([]);
  console.log(rentStateData);
  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(0);
  const [current, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(0);

  useEffect(async () => {
    // let fetchData = await fetch(`${apiUrl}list_nfts`)
    // fetchData = await fetchData.json();
    // console.log("fetcgDatafetcgData",fetchData)

    // fetchData = fetchData ? fetchData.data : fetchData;
    setRentStateData(rentData);
    setminValue(0);
    setmaxValue(pageSize);
    settotalPage(rentData.length / pageSize);
  }, []);

  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  const handleChange = (value) => {
    setCurrentPage(value);
    setminValue((value - 1) * pageSize);
    setmaxValue(value * pageSize);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" style={{ fontWeight: '600', fontSize: '16px' }}>
        Single Items
      </Menu.Item>
      <hr />
      <Menu.Item key="2" style={{ fontWeight: '600', fontSize: '16px' }} >
        Bundles
      </Menu.Item>

    </Menu>
  );
  const menu2 = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" style={{ fontWeight: '600', fontSize: '16px' }}>
        Recently List
      </Menu.Item>
      <hr />
      <Menu.Item key="2" style={{ fontWeight: '600', fontSize: '16px' }} >
        Recently Created
   </Menu.Item>
      <hr />
      <Menu.Item key="2" style={{ fontWeight: '600', fontSize: '16px' }} >
        Recently Sold
   </Menu.Item>
      <hr />
      <Menu.Item key="2" style={{ fontWeight: '600', fontSize: '16px' }} >
        Recently Recieved
   </Menu.Item>
    </Menu>
  );

  function handleMenuClick(e) {
    // message.info('Click on menu item.');
    console.log('click', e);
  }


  return (
    <>
      {/* Rent Screen  */}
      <div className=" ">
        <div className="row my-4     ">
          <div className="col-12">
            <div className="row  ">
              <div className="col-lg-6  my-2  ">
                <p className="ms-5 ">66,290,741 results</p>
              </div>
              <div className="  my-2       col-lg-6  ">

                <div className="d-flex dropDown" >
                  <div className="me-3  ">
                    <Dropdown overlay={menu}>
                      <Button>
                        All Items <DownOutlined />
                      </Button>
                    </Dropdown>
                  </div>
                  <div className="mt-3 mt-md-0">
                    <Dropdown overlay={menu2}>
                      <Button>
                        Recently Created <DownOutlined />
                      </Button>
                    </Dropdown>
                  </div>
                </div>

              </div>
            </div>
            <div className="row cardInfo">
              {rentStateData
                ? rentStateData.map(
                  (data, index) =>
                    index >= minValue &&
                    index < maxValue && (
                      <div className="col-md-6 col-lg-3  col-sm-6   offset-3 col-xl-2 col-xxl-2  offset-lg-0 offset-md-0  ">
                        <RentCard data={data} />
                      </div>
                    )
                )
                : ""}
            </div>
            <div className="row">
              <div className="col-lg-12 mt-4  mb-3 text-center">
                <Pagination
                  pageSize={pageSize}
                  current={current}
                  total={rentStateData ?.length}
                  onChange={handleChange}
                  style={{ bottom: "0px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lend;
