import React, { useEffect, useCallback, useState } from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import { Fade, Modal, Backdrop } from "@material-ui/core";
import { useStore } from "../../context/GlobalState";
import TextField from "@material-ui/core/TextField";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { liftNftColetralAsync } from '../../store/asyncActions';
import { makeApiTrigger } from '../../store/actions';
import 'dotenv'
import { rentAsync, stopLendingAsync } from '../../store/asyncActions';
import { ERC20_ABI } from '../../contract/ERC20_ABI'
import { packPrice, unpackDailyPrice } from '../../store/bytesHandler'
import { RENTAL_ADDRESS } from '../../contract/RENTAL'


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 440,
    height: 400,
    backgroundColor: "white",
    border: "2px none #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
    borderRadius: "30px 30px 30px 30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    '@media (max-width: 420px)': {
      width: '370px',
      height: '380px'
    },

    '@media (max-width: 380px)': {
      width: '330px',
      height: '365px'
    },

  },
  textField: {
    width: "100%"
  },
  btn: {
    background: "#1077b3",
    borderRadius: "20px",
    color: "white",
    width: "100%",
    padding: "10px 10px",
    fontSize: "22px",
    marginTop: "10px",
    cursor: "pointer"
  }
}));

const CancelModal = ({ data, handleCloseResellModal }) => {
  const [qrCode, setQrCode] = useState(false);
  const [{ web3, accounts, contract, apiUrl }, dispatch] = useStore();
  let [colletral, setColletral] = useState("");
  let [dailyPrice, setDailyPrice] = useState("");
  let [duration, setDuration] = useState("");
  let [approveToggle, setApproveToggle] = useState(false);

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const sendRequest = useCallback(async () => {
    // loadBlockchain(dispatch);
  }, []);


  const onSubmit = async () => {

    let token_id = data.token_id;
    let token_address = data.token_address;
    console.log("ew", token_id, colletral, dailyPrice, duration, token_address)

    try {
      let daily_rent_price = packPrice(dailyPrice);
      let nft_price = packPrice(colletral);
      console.log("data", data)
      let token_address = data.token_address;      
      let lend_id = data.lend_id
      let receipt = await stopLendingAsync(web3, contract, accounts, token_address, token_id, lend_id)
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
        let fetchNftData = await fetch(`${apiUrl}canel_lending`, requestOptions);

        fetchNftData = await fetchNftData.json();

      }


   
    }
    catch (error) {
      console.log("error", error);
    }
  };




  return (
    <div>
      <>
        <div style={modalStyle} className={classes.paper}>
          <h1 style={{ color: "black" }}> Cancel Lending  </h1>
        
              <button className="buy-btn" onClick={onSubmit}
              >
                Cancel Lending 
          </button>
      
        </div>
      </>

    </div>
  );
};

export default CancelModal;
