import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { Pagination, List } from "antd";

import "./style-R.css";
import "./style.css";
import RentCard from "./card";
import { rentData } from "../../data/index";
import { useStore } from '../../context/GlobalState';
import Moralis from 'moralis';
import {lendAsync} from '../../store/asyncActions'


const Lend = () => {
  const pageSize = 8;
  const [{ web3, contract, accounts, apiUrl }, dispatch] = useStore();


  const [rentStateData, setRentStateData] = useState([]);
  console.log(rentStateData);
  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(0);
  const [current, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(0);
  const [allNftData, setAllNftData] = useState()

  useEffect(async () => {
    if (web3 && contract && accounts[0]) {
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
      let fetchData = await fetch(`${apiUrl}lend_nft_list`, requestOptions)
      fetchData = await fetchData.json();
      console.log("fetcgDatafetcgData", fetchData)

      // fetchData = fetchData ? fetchData.data : fetchData;
      // setRentStateData(fetchData);
      // setminValue(0);
      // setmaxValue(pageSize);
      // settotalPage(fetchData.length / pageSize);
    }
  }
    , [web3, contract, accounts]);

  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  const handleChange = (value) => {
    setCurrentPage(value);
    setminValue((value - 1) * pageSize);
    setmaxValue(value * pageSize);
  };

  React.useEffect(async () => {
    // const serverUrl = "https://zrgs9ntgp1xg.grandmoralis.com:2053/server";
    // const appId = "ehjdZ3SrJBc8mvotS9zIVpJ3ERQ1hXLolg9rJo2d";
    // // let t = await Moralis.start({serverUrl,appId})
    // Moralis.initialize("ehjdZ3SrJBc8mvotS9zIVpJ3ERQ1hXLolg9rJo2d", "", "sO7IJveC1wGqenEclYGF8He9mdAqkqBASB34l5bp");
    // Moralis.serverURL = 'https://zrgs9ntgp1xg.grandmoralis.com:2053/server'
    // // console.log("lol",t)
    // Moralis.authenticate().then(async function (user) {
    //   console.log("etherAddress", user.get("ethAddress"))
    //   const users = Moralis.User.current();
    //   console.log("user", users)
    //   Moralis.start({ serverUrl, appId });
    //   const options = { address: "0x32aa08334e255e8c44b92599e2b43c9587fd5568", chain: "rinkeby" };
    //   const metaData = await Moralis.Web3API.token.getNFTMetadata(options);
    //   const usernftBalance = await Moralis.Web3.getNFTs({ chain: "rinkeby" })
    //   console.log("usernftBalance", usernftBalance)
    //   console.log("metaData", metaData)
    //   let nftArray = []
    //   // for(let i = 0;  i < usernftBalance.length; i++) {
    //   for (let i = 0; i < usernftBalance.length; i++) {
    //     let fetchData = await fetch(usernftBalance[i].token_uri)
    //     fetchData = await fetchData.json();
    //     nftArray.push(fetchData);
    //     console.log("dsdsad", fetchData)
    //   }
    //   // setAllNftData(nftArray)
    //   setRentStateData(nftArray);
    //   setminValue(0);
    //   setmaxValue(pageSize);
    //   settotalPage(nftArray.length / pageSize);
    // })
    setRentStateData(rentData);
    setminValue(0);
    setmaxValue(pageSize);
    settotalPage(rentData.length / pageSize);
  }, [])

  const handleLend = async() =>{
    try{
      console.log("handleLend")

      let receipt =  await lendAsync(web3,contract,accounts);
    }
    catch(error){
      console.log("error",error)
    }
  }

  return (
    <>
      {/* Rent Screen  */}
      <div className=" ">
      <button className="btn btn-block rentBtn" onClick={handleLend}> RENT NOW</button>

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
                total={rentStateData ?.length}
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
