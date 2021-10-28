import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { Pagination, List } from "antd";
import { Menu, Dropdown, Button, message, Space, Tooltip } from "antd";
import "./style-R.css";
import "./style.css";
import RentCard from "./card";
import { rentData } from "../../data/index";
import { useStore } from "../../context/GlobalState";
import Moralis from 'moralis';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const Lend = () => {
  const pageSize = 12;
  const [{ web3, accounts, contract, apiUrl }, dispatch] = useStore();

  // useEffect(async () => {
  //   const serverUrl = "https://zrgs9ntgp1xg.grandmoralis.com:2053/server";
  //   const appId = "ehjdZ3SrJBc8mvotS9zIVpJ3ERQ1hXLolg9rJo2d";
  //   // let t = await Moralis.start({serverUrl,appId})
  //   Moralis.initialize("ehjdZ3SrJBc8mvotS9zIVpJ3ERQ1hXLolg9rJo2d", "", "sO7IJveC1wGqenEclYGF8He9mdAqkqBASB34l5bp");
  //   Moralis.serverURL = 'https://zrgs9ntgp1xg.grandmoralis.com:2053/server'
  //   // console.log("lol",t)
  //   Moralis.authenticate().then(async function (user) {
  //     console.log("etherAddress", user.get("ethAddress"))
  //     const users = Moralis.User.current();
  //     console.log("user", users)
  //     Moralis.start({ serverUrl, appId });

  //     const usernftBalance = await Moralis.Web3.getNFTs({ chain: "rinkeby" })

  //     // console.log("metaData", metaData)
  //     console.log("usernftBalance", usernftBalance)

  //     let nftArray = []
  //     for (let i = 0; i < usernftBalance.length; i++) {
  //       let neo = {}
  //       neo['token_id'] = usernftBalance[i].token_id
  //       neo['token_address'] = usernftBalance[i].token_address
  //       neo['token_uri'] = usernftBalance[i].token_uri

  //       nftArray.push(neo);
  //       console.log("dsdsad", neo)

  //     }
  //     // setAllNftData(nftArray)


  //     setRentStateData(nftArray);
  //     setminValue(0);
  //     setmaxValue(pageSize);
  //     settotalPage(nftArray.length / pageSize);

  //   })
  // }, [])


  const [rentStateData, setRentStateData] = useState([]);
  console.log(rentStateData);
  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(0);
  const [current, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(0);

  useEffect(async () => {

    // setRentStateData(rentData);
    // setminValue(0);
    // setmaxValue(pageSize);
    // settotalPage(rentData.length / pageSize);
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
