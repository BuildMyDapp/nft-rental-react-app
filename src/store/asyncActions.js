import { setupWeb3, setupContract, setNetwork, addEthereumAccounts, addTransaction, web3LoadingError } from "./actions";
import Web3 from "web3";
import { RENTAL_ABI, RENTAL_ADDRESS } from '../contract/RENTAL';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from 'ethers';

export const loadBlockchain = async (dispatch) => {
    try {
        console.log("Web3 = ", Web3);
        console.log("Web3.givenProvider = ", Web3.givenProvider);
        dispatch(setNetwork(Web3.givenProvider.chainId));
        if (Web3.givenProvider) {

            // if (Web3.givenProvider && Web3.givenProvider.chainId == 0x38	) {
            window.ethereum.on('accountsChanged', function (accounts) {
                dispatch(addEthereumAccounts(accounts));
            });

            const web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
            dispatch(setupWeb3(web3));
            const contract = new web3.eth.Contract(RENTAL_ABI, RENTAL_ADDRESS);
            dispatch(setupContract(contract));
            const accounts = await web3.eth.getAccounts();
            dispatch(addEthereumAccounts(accounts));
            console.log("contract", contract);
            console.log("contract", contract.methods)
        }
        else {
            dispatch(web3LoadingError("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"))
        }
    }
    catch (error) {
        console.log("Error in loading Web3 = ", error);
        if (error.code === 4001) {

            dispatch(web3LoadingError(error.message));
        }
    }
}

export const loadWalletConnect = async (dispatch) => {
    try {
        const provider = new WalletConnectProvider({

            rpc: {
                56: "https://bsc-dataseed.binance.org/",
            },
            rpcUrl: "https://bsc-dataseed.binance.org/",
            chainId: 56
        });
        if (provider) {
            await provider.enable();

            const web3 = new Web3(provider);
            console.log(web3)

            // await Web3.givenProvider.enable();
            dispatch(setupWeb3(web3));
            const contract = new web3.eth.Contract(RENTAL_ABI, RENTAL_ADDRESS);
            console.log("this is for contract", contract)

            dispatch(setupContract(contract));
            const accounts = await web3.eth.getAccounts();
            console.log("this is for accounts", accounts)
            dispatch(addEthereumAccounts(accounts));
            console.log("contract = ", contract);
            console.log("contract.methods = ", contract.methods);
        }
        else {
            dispatch(web3LoadingError("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"))
        }
    }
    catch (error) {
        console.log("Error in loading Web3 = ", error);
        if (error.code === 4001) {

            dispatch(web3LoadingError(error.message));
        }
    }
}



export const lendAsync = async(web3,contract,accounts) =>{
    console.log("contractfunction",contract)


    try{
        // let nftPricce = web3.utils.asciiToHex("2000")
        // console.log("contractfunctiossn",nftPricce)
        // nftPricce = nftPricce.slice(0, 10) 
        // console.log("contractfunctiossn",nftPricce)

        // let dailyRent = web3.utils.asciiToHex("1000")
        // dailyRent = dailyRent.slice(0, 10) 
        // console.log("contractfunctiossn",dailyRent)
        // let bytes32 = ethers.utils.formatBytes32String("100")
        let receipt = await contract.methods.lend(["0xd43136799c9AE15d33D7648a1Dc8655501160358"],["2"],["1"],["2"],["0x000003e8"],["0x000007d0"],["1"]).send({from:accounts[0]});

    }   
    catch(error){
        console.log("error",error)
        return error
    }
}

export const rentAsync = async(web3,contract,accounts) =>{
    try{
    let receipt = await contract.methods.rent(["0xd43136799c9AE15d33D7648a1Dc8655501160358"],["1"],["1"],["2"]).send({from:accounts[0]});
        return receipt
    }   
    catch(error){
        console.log("error",error)
        return error
    }
}

export const stopLendingAsync = async(web3,contract,accounts) =>{
    try{
    let receipt = await contract.methods.stopLending(["0xd43136799c9AE15d33D7648a1Dc8655501160358"],["1"],["1"]).send({from:accounts[0]});
        return receipt
    }   
    catch(error){
        console.log("error",error)
        return error
    }
}