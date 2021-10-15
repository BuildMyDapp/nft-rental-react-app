import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { Pagination, List } from "antd";

import "./style-R.css";
import "./style.css";
import RentCard from "./card";
import { rentData } from "../../data/index";
import { useStore } from '../../context/GlobalState';

const Lend = () => {
  const pageSize = 8;
  const [{ web3, contract, accounts, apiUrl }, dispatch] = useStore();


  const [rentStateData, setRentStateData] = useState([]);
  console.log(rentStateData);
  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(0);
  const [current, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(0);

  useEffect(async () => {
    if(web3 && contract && accounts[0]) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
    let ownerAddress = accounts[0];
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          ownerAddress
        })
    };
    let fetchData = await fetch(`${apiUrl}lend_nft_list`,requestOptions)
    fetchData = await fetchData.json();
    console.log("fetcgDatafetcgData",fetchData)

    fetchData = fetchData ? fetchData.data : fetchData;
    setRentStateData(fetchData);
    setminValue(0);
    setmaxValue(pageSize);
    settotalPage(fetchData.length / pageSize);
  }
}
, [web3,contract,accounts]);

  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  const handleChange = (value) => {
    setCurrentPage(value);
    setminValue((value - 1) * pageSize);
    setmaxValue(value * pageSize);
  };

  return (
    <>
      {/* Rent Screen  */}
      <div className=" ">
        <div className="row my-4 rentScreen   ">
          <div className="row  ">
            <div className=" mt-4 my-2 ms-lg-5    col-lg-11 d-flex justify-content-end">
              <p className="me-2  text-white toogleText "> AVAILABLE TO LEND</p>
              <div className=" toggle">
                <Switch defaultChecked onChange={onChange} />
              </div>
            </div>
          </div>
          <div className="row cardInfo">
            {rentStateData
              ? rentStateData.map(
                  (data, index) =>
                    index >= minValue &&
                    index < maxValue && (
                      <div className="col-md-6 col-lg-4 col-sm-12 offset-sm-2 offset-3 col-xl-3  offset-lg-0 offset-md-0  ">
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
                total={rentStateData?.length}
                onChange={handleChange}
                style={{ bottom: "0px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lend;
