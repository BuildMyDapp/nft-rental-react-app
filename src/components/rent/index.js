import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { Pagination, List } from "antd";

import "./style-R.css";
import "./style.css";
import RentCard from "./card";
import { rentData } from "../../data/index";

const Rent = () => {
  const pageSize = 8;

  const [rentStateData, setRentStateData] = useState([]);
  console.log(rentStateData);
  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(0);
  const [current, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(0);

  useEffect(async () => {
    let fetchData = await rentData;
    setRentStateData(fetchData);
    setminValue(0);
    setmaxValue(pageSize);
    settotalPage(fetchData.length / pageSize);
  }, []);

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
              <p className="me-2  text-white toogleText "> AVAILABLE TO RENT</p>
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

export default Rent;
