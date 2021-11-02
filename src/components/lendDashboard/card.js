import React, { useState, useEffect } from "react";
import "./style-R.css";
import "./style.css";
import { Card } from "antd";
import opensea from "../../../src/opensea.png";
import rarible from "../../../src/rarible.png";
import { stopLendingAsync } from '../../store/asyncActions';
import { useStore } from "../../context/GlobalState";
import Modal from '@material-ui/core/Modal';
import CancelModal from '../../modal/cancelLend';
import {claimColletralAsync} from '../../store/asyncActions';
const DashboardCard = ({ data }) => {
  console.log(data);

  const [{ web3, accounts, contract, apiUrl }, dispatch] = useStore();
  const [claimToggle, setClaimToggle] = useState(false)

  useEffect(()=>{
    let endPoint = data.block_timestamp + data.duration_seconds;
    let startPoint = ~~(Date.now() / 1000)
    if (startPoint >= endPoint) {
      setClaimToggle(true)
    }
  },[])



  const [rentModal, setRenModal] = useState(false);


  const rentModalOpen = () => {
    setRenModal(true);
  };

  const rentModalClose = () => {
    setRenModal(false);
  };
  const handleClaimColletral = async () => {
    let token_id = data.token_id;
    let token_address = data.token_address;

    try {
   
      console.log("data", data)
      let token_address = data.token_address;
      let lend_id = data.lend_id
      let receipt = await claimColletralAsync(web3, contract, accounts, token_address, token_id, lend_id)
      console.log("receipt", receipt)
      if (receipt && receipt.status) {

        let id = data.id



        const myHeaders = new Headers
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({
            id
          })
        };
        let fetchNftData = await fetch(`${apiUrl}claim_nft`, requestOptions);

        fetchNftData = await fetchNftData.json();

      }



    }
    catch (error) {
      console.log("error", error);
    }
  }
  return (
    <>
      <Card
        className=" "
        cover={
          <img
            alt="card "
            className="cardImg"
            src="https://bafybeidjwr4dikewpqitz3hrfkrn64sxtddiynjv5kow3w6pzpuwgoysi4.ipfs.infura-ipfs.io/"
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
        {
          data.rental == 1 ?
            <>
              {
                claimToggle ?
                  <button className="btn      rentBtnX" onClick={handleClaimColletral}>Claim Colletral</button>
                  :
                  <button className="btn      rentBtnX" style={{ cursor: "not-allowed" }}>Claim Colletral</button>
              }
            </>
            :
            <button className="btn      rentBtnX" onClick={rentModalOpen}>Stop Lending</button>

        }
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
      <Modal
        open={rentModal}
        onClose={rentModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CancelModal data={data} rentModalClose={rentModalClose} />
      </Modal>
    </>
  );
};

export default DashboardCard;
