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
import { rentAsync } from '../../store/asyncActions';
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

const RentNftModal = ({ data, handleCloseResellModal }) => {
  const [qrCode, setQrCode] = useState(false);
  const [{ web3, accounts, contract, apiUrl }, dispatch] = useStore();
  let [colletral, setColletral] = useState("");
  let [dailyPrice, setDailyPrice] = useState("");
  let [duration, setDuration] = useState("");
  let [approveToggle, setApproveToggle] = useState(false);
  const [nftPrice, setNftPrice] = useState()
  const [dailyRentPrice, setdailyRentPrice] = useState()
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const sendRequest = useCallback(async () => {
    // loadBlockchain(dispatch);
  }, []);


  useEffect(async () => {
    console.log("data", data)
    let nft_price = unpackDailyPrice(data.nft_price);
    setNftPrice(nft_price);
    let daily_rent_price = unpackDailyPrice(data.daily_rent_price);
    setdailyRentPrice(daily_rent_price);

  }, [])

  const handleApprove = async () => {
    try {
      let token_address = data.token_address;
      let token_id = data.token_id;
      let _nftPrices = unpackDailyPrice("0x00640000");
      let _dailyRentPrices = unpackDailyPrice("0x000a0000");
      console.log(
        "unpacked", _nftPrices, _dailyRentPrices
      )
      const contractErc20 = new web3.eth.Contract(ERC20_ABI, "0xc778417e063141139fce010982780140aa0cd5ab");
      console.log("contractErc20", contractErc20.methods);
      let amount = 300 * 10 ** 18;
      amount = amount.toString()
      console.log("amount", amount)
      console.log("before", token_id, RENTAL_ADDRESS, amount)
      let receipt = await contractErc20.methods.approve(RENTAL_ADDRESS, amount).send({ from: accounts[0] })
      console.log("receipt", receipt)
      let approval = await contractErc20.methods.allowance(accounts[0], RENTAL_ADDRESS).call();
      approval = approval.toString();
      console.log("approval", approval)
      setApproveToggle(true)

    }
    catch (error) {
      console.log("error", error)
    }
  }
  const onSubmit = async () => {

    let token_id = data.token_id;
    let token_address = data.token_address;
    console.log("ew", token_id, colletral, dailyPrice, duration, token_address)

    try {

      console.log("data", data)
      let lend_id = data.lend_id
      let receipt = await rentAsync(web3, contract, accounts, token_address, token_id, lend_id, duration)
      console.log("receipt", receipt)
      if (receipt && receipt.status) {
        let blockNumber = receipt.blockNumber;
        let timestamp = await web3.eth.getBlock(blockNumber);
        let block_timestamp = timestamp.timestamp
        let id = data.id
        let user_address = accounts[0]
        let user_duration = duration


        const myHeaders = new Headers
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({
            id, user_address, block_timestamp, user_duration
          })
        };
        let fetchNftData = await fetch(`${apiUrl}rent_update`, requestOptions);

        fetchNftData = await fetchNftData.json();

      }


      // let neo = unpackDailyPrice(0x00010000);
      // console.log("neo",neo)
    }
    catch (error) {
      console.log("error", error);
    }
  };

  console.log("datadatadatadata", data)




  return (
    <div>
      <>
        <div style={modalStyle} className={classes.paper}>

          <h1 style={{ color: "black" }}>Rent your NFT </h1>

          <div className="modal-container">
            <p className="p1">
              nft price
            </p>
            <p className="p2">
              {nftPrice ? nftPrice : 0}
            </p>
          </div>

          <div className="modal-container">
            <p className="p1">
              Daily Rent price
            </p>
            <p className="p2">
              {dailyRentPrice ? dailyRentPrice : 0}
            </p>
          </div>


          <TextField type="text"
            className="text-field" placeholder="duration" label="duration" type="text" value={duration} onChange={(e) => setDuration(e.target.value)}
          />

          {
            approveToggle ?
              <button className="buy-btn" onClick={onSubmit}
              >
                Rent now
          </button>
              :
              <button className="buy-btn" onClick={handleApprove}
              >
                Approve
      </button>
          }


          {/* <button className="buy-btn" onClick={onSubmit}
              >
                Rent now
          </button> */}


        </div>
      </>

    </div>
  );
};

export default RentNftModal;
