import React from "react";
import "./style-R.css";
import "./style.css";
import { Card } from "antd";
import opensea from "../../../src/opensea.png";
import rarible from "../../../src/rarible.png";
const DashboardCard = ({ data }) => {
  console.log(data);
  return (
    <>
      <Card
        title={
          <>
            <div className="mainCardIcon">
              <a href="https://opensea.io/assets/0x9d413b9434c20c73f509505f7fbc6fc591bbf04a/7085325">
                {" "}
                <img src={opensea}></img>
              </a>
              <a href="https://rarible.com/token/0x9d413b9434c20c73f509505f7fbc6fc591bbf04a:7085325">
                {" "}
                <img src={rarible} className="ms-1"></img>
              </a>
            </div>
          </>
        }
        className=" "
        width="15rem"
        extra={
          <>
            <div className="cardHeadBox"></div>
          </>
        }
        cover={
          <img
            alt="card "
            className="cardImg"
            src={data?.image_uri}
            width="240"
            height="200"
          />
        }
      >
        <div className="cardTitle d-flex">
          <h5 className="text-center">{data?.name}</h5>

          <i className="fas fa-paperclip paperClips"></i>
        </div>
        <div className="cardData">
          <p>Address ... {data.address}</p>
          <p>Token Id ............ {data.token_id}</p>
          <p>Standard .......... {data.standard}</p>
          <p>Daily price [WETH] {data.daily_price}</p>
          <p>
            Max duration [days]
            {data.max_duration}
          </p>
          <p>Collateral [WETH] {data.colletral}</p>
        </div>
        <button className="btn btn-block rentBtn"> RENT NOW</button>
      </Card>
    </>
  );
};

export default DashboardCard;
