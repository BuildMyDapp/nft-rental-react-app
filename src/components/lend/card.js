import React from "react";
import "./style-R.css";
import "./style.css";
import { Card } from "antd";
import opensea from "../../../src/opensea.png";
import rarible from "../../../src/rarible.png";
import { lendAsync } from '../../store/asyncActions';
import { useStore } from "../../context/GlobalState";

const LendCard = ({ data }) => {
  const [{ web3, accounts, contract, apiUrl }, dispatch] = useStore();

  const handleLend = async () => {

    try {
      let receipt = await lendAsync(web3, contract, accounts)
    }
    catch (error) {
      console.log("handle lend error", error)
    }
  }
  console.log(data);
  return (
    <>
      <Card
        className=" "
        cover={
          <img
            alt="card "
            className="cardImg"
            src={data ?.image_uri}
            width="240"
            height="200"
          />
        }
      >
        <div className="d-flex justify-content-between">
          <div>
            <p className="cardDataName">{data.name} </p>
            <p className="cardDataNameX">Punks {data.token_id} </p>
          </div>
          <div>
            <p className="text-end price">Price </p>
            <p className="eth-icon">
              {" "}
              <span>
                {" "}
                <i className="fab fa-ethereum me-1   "></i>
              </span>{" "}
              {data.daily_price}{" "}
            </p>
          </div>
        </div>
        <button className="btn      rentBtnX" onClick={handleLend}>Lend Now</button>
        <div className="footer d-flex justify-content-between">
          <div>
            <p className="text-end">
              <i className="fas fa-cog setting" style={{ color: 'darkgray' }}  ></i>
            </p>
          </div>
          <div>
            <p className="text-end">
              <i className="fas fa-heart  Hearticon" style={{ color: 'darkgray' }} ></i><span className="ms-1">2</span>
            </p>
          </div>

        </div>
      </Card>
    </>
  );
};

export default LendCard;
