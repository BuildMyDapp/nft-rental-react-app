import React,{useState} from "react";
import "./style-R.css";
import "./style.css";
import { Card } from "antd";
import opensea from "../../../src/opensea.png";
import rarible from "../../../src/rarible.png";
import { stopLendingAsync } from '../../store/asyncActions';
import { useStore } from "../../context/GlobalState";
import Modal from '@material-ui/core/Modal';
import CancelModal from '../../modal/cancelLend'
const DashboardCard = ({ data }) => {
  console.log(data);

  const [{ web3, accounts, contract, apiUrl }, dispatch] = useStore();

  const handleStopLending = async () => {

    try {
      let receipt = await stopLendingAsync(web3, contract, accounts)
    }
    catch (error) {
      console.log("handle lend error", error)
    }
  }

  const [rentModal, setRenModal] = useState(false);

  
  const rentModalOpen = () => {
    setRenModal(true);
  };

  const rentModalClose = () => {
    setRenModal(false);
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
        <button className="btn      rentBtnX" onClick={rentModalOpen}>Stop Lending</button>
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
