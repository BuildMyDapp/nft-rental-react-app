import React, { useState } from "react";
import "./style-R.css";
import "./style.css";
import { Card } from "antd";
import opensea from "../../../src/opensea.png";
import rarible from "../../../src/rarible.png";
import { lendAsync } from '../../store/asyncActions';
import { useStore } from "../../context/GlobalState";
import Modal from '@material-ui/core/Modal';
import LendNftModal from '../../modal/lendNft/index'

const LendCard = ({ data }) => {
  const [{ web3, accounts, contract, apiUrl }, dispatch] = useStore();

  const handleLend = async () => {

    try {
      let receipt = await lendAsync(web3, contract, accounts)
      if (receipt) {
        // const myHeaders = new Headers();
        // myHeaders.append('Content-Type', 'application/json');
        // myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
        // const requestOptions = {
        //   method: 'POST',
        //   headers: myHeaders,
        //   body: JSON.stringify({
        //     name, description,
        //     image, token_address, token_id,
        //     payment_period, down_payment_period, duration, amount, image_uri, owner_address, nfT_colletral_id,
        //     currency_address
        //   })
        // };
        // let fetchNftData = await fetch(`${apiUrl}save_nft`, requestOptions);

        // fetchNftData = await fetchNftData.json();

      }
    }
    catch (error) {
      console.log("handle lend error", error)
    }
  }

  const [lendModal, setLendModal] = useState(false);

  console.log(data);

  const lendModalOpen = () => {
    setLendModal(true);
  };

  const lendModalClose = () => {
    setLendModal(false);
  };
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
        <button className="btn      rentBtnX" onClick={lendModalOpen}>Lend Now</button>
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
        open={lendModal}
        onClose={lendModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <LendNftModal data={data} lendModalClose={lendModalClose} />
      </Modal>
    </>
  );
};

export default LendCard;
