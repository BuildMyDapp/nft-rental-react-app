import React from "react";
import "./style-R.css";
import "./style.css";
import lendImg from "../../nftImg.png";
import lendModel from "../../lend-modal.png";
import bullet1 from "../../source/bullet-1.png";
import bullet2 from "../../source/bullet-2.png";
import bullet3 from "../../source/bullet-3.png";
import bullet4 from "../../source/bullet-4.png";
import bullet5 from "../../source/bullet-5.png";
import bullet6 from "../../source/bullet-6.png";
import bullet7 from "../../source/bullet-7.png";
import bullet8 from "../../source/bullet-8.png";
import bullet9 from "../../source/bullet-9.png";
import bullet10 from "../../source/bullet-10.png";
import rentNft from "../../source/rentNft.png";
import rentModel from "../../source/rent-modal.png";
import risk from "../../source/risk.png";
const Faq = () => {
  return (
    <>
      <div className="row rentScreen faqScreen">
        <div className="col-lg-12">
          <img className="my-3 headingImg" src={lendImg} alt="" />
          <p className="text-white mt-4 lendInfoPara">
            Head out to the LEND tab above. Pick an NFT you would like to lend.
            You will get a modal like this. Let's go through it together to
            understand what each piece of information here means.
          </p>
          <div className=" d-flex justify-content-center  align-content-center">
            <img className=" mt-4 " src={lendModel} alt="" />
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet1} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>NFT standard. </span> This is the NFT standard. There are 2
              main standards out there: 721 and 1155. The 1155 standard lets you
              mint semi-fungible NFTs, which means that you have more than one
              NFT that looks the same, even though, they would have the same id.
              ReNFT protocol allows you to lend multiple amounts of this
              standard. But you need to understand a couple of things, before
              you lend such an NFT. We shall explain the nuances below.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet2} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>NFT Address. </span> This is the NFT standard. There are 2
              NFT address. NFT address of the NFT you are about to lend.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet3} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>Token Id. </span> This is the NFT standard. There are 2
              Token ID of the NFT you are about to lend.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet4} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>Available amount. </span> For 1155 standard, this number
              will tell you how many copies of this semi-fungible NFT you have.
              For 721s, this is always 1. This number tells you the maximum
              number of NFTs that you can lend.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet5} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span> Lend amount. </span> In this example, we will only lend 2
              copies. For 721s, you can not set this number, since there is only
              ever 1 copy, so it will be disabled for you by default.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet6} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>Max lend duration. </span> It is imperative that you
              understand that this is the maximum number of days that your NFT
              can be rented out for by someone else. Therefore, be careful not
              to set it for too long, because if the floor price of the NFT
              rises, the renter may choose to not return the NFT. Think of
              lending as selling a call contract with a strike price of the
              collateral. If the floor price during the rent goes up to 2 ETH
              and you have set the collateral price at 1 ETH, then there is
              obviously a profit of 1 ETH for the renter. Therefore, it is
              important to actively monitor the market and update your lending
              when required. Another good way to manage this risk is to set a
              small max lend duration, such that it is less likely that the
              floor price goes up during the rent.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet7} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>Borrow price. </span> How much the renter will pay you per
              day for renting the NFT. The payments are accrued per second. If
              you return the NFT earlier, the correct amounts will be
              compensated back to you. Keep in mind, that when renter rents,
              they will pay both the full amount of rent, as well as collateral.
              This will go into the reNFT contract for escrow. In this example,
              the renter will have to pay 0.01 WETH per day to rent ALL (2
              copies) of the NFTs we are lending here. Also note, due to the
              design of the contract, the numbers are limited to 4 decimal
              places for both the borrow price and the collateral. Also, note,
              that the whole number cannot exceed 4 digits. This means that the
              max number is 9999.9999 and the min number is 0.0001.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet8} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>Collateral PER COPY. </span> we support WETH and a bunch of
              other stablecoins.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet9} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>Payment token, </span> we support WETH and a bunch of other
              stablecoins.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet10} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>Action button.</span> If this is the first time you are
              lending a particular NFT, you will need to approve it. Only after
              approval, will you be able to lend it. So keep this in mind, you
              may need to issue two transactions on the first time around the
              NFT interacts with the ReNFT contract.
            </p>
          </div>

          {/* How to Rent An NFT */}

          <img className="my-3 headingImg" src={rentNft} alt="" />
          <p className="text-white mt-4 lendInfoPara">
            Head out to the LEND tab above. Pick an NFT you would like to lend.
            You will get a modal like this. Let's go through it together to
            understand what each piece of information here means.
          </p>
          <div className=" d-flex justify-content-center  align-content-center">
            <img className=" mt-4 " src={rentModel} alt="" />
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet1} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>NFT standard. </span> This is the NFT standard. There are 2
              main standards out there: 721 and 1155. The 1155 standard lets you
              mint semi-fungible NFTs, which means that you have more than one
              NFT that looks the same, even though, they would have the same id.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet2} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>NFT Address. </span> NFT address of the NFT you are about to
              rent.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet3} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>Token Id. </span>Token ID of the NFT you are about to rent.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet4} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>Rent amount. </span> For 1155 standard, this number will
              tell you how many copies of this semi-fungible NFT the lender is
              lending. The collateral you will pay will be multiplied by this
              number.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet5} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span> Rent duration. </span> The length of the rent. If you fail
              to return the NFT by the end of this period, the lender will be
              able to claim the collateral you will pay.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet6} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>Daily rent price. </span> Total daily rent price for all the
              NFTs.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet7} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>Collateral PER COPY. </span> Collateral price per NFT. If
              this is a 721 standard, then this is a total collateral you have
              to pay. If this is 1155, then this is a per item collateral price.
              Note that you will have to pay full rent amount plus full
              collateral to rent. If you return earlier, the rent payment will
              be compensated proportionally. Collateral gets returned on
              successful return, as well.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet8} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span>Total rent payable. </span> Depending on the standard and
              the number of days of the rent, this field will give you the total
              amount payable you will send to the reNFT contract for escrow.
            </p>
          </div>
          <div className="d-flex mt-3 ">
            <img src={bullet9} alt="" width="30px" height="30px" />
            <p className="mt-2 ms-1 lendInfoPara">
              <span> Action button. </span>If this is the first time you are
              renting, you will need to approve the payment token for reNFT. You
              will only need to do this once, per payment token. This button
              will change to Rent, once you have approved the payment token.
            </p>
          </div>

          <img className="my-4 headingImg" src={risk} alt="What are Risks" />
          <p className="lendInfoPara ms-4">
            The contracts were not audited. However, they have been thoroughly
            tested and peer reviewed, exercise caution, all responsibility due
            to loss bares with the users of the app.
          </p>
        </div>
      </div>
    </>
  );
};

export default Faq;
