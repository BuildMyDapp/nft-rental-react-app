import React from 'react';
// import Header from '../marketPlace/header/index';
import PublishNftForm from './form/index';
import './style.css';

const PublishNft = () => {
    return (
        <>

        <div className="p-nft-"  style={{backgroundColor:"white"}}>
            {/* <Header/> */}
            <div className="p-nft-form-cont container">
            <br/>
            <PublishNftForm/>
            </div>
        </div>

        </>
    )
}

export default PublishNft
