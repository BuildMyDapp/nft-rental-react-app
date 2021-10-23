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
// export const buyTokensAsync = async (beneficiary, accounts, contract, etherValue, dispatch) => {
//     console.log("before transaction");
//     const price = etherValue.toString(); //change it
//     const receipt = await contract.methods
//         .buyTokens(beneficiary)
//         .send({ from: accounts[0], value: price });
//     console.log("after  transaction ", receipt);
// }
export const buyNft = async (web3, contract, accounts, amount, id, handleNavigate,
    nftDetails, apiUrl) => {
    console.log("before transaction", contract, accounts, amount, id);
    const myHeaders = new Headers();
    console.log("handleNftBuy", nftDetails.owner_address)
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
    try {
        const price = amount.toString();
        const receipt = await contract.methods
            .buy(id)
            .send({ from: accounts[0], value: price }).on('transactionHash', async (hash) => {
                console.log('Received txHash: ', hash);

                let det = await web3.eth.getTransaction(hash);
                console.log('Receiveddeth: ', det);
                let ownerAddress = accounts[0];
                let id = nftDetails.id
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({
                        id, ownerAddress
                    })
                };
                let fetchNftData = await fetch(`${apiUrl}buy_nft`, requestOptions);
                handleNavigate()
            });

        console.log("receipt", receipt);
        return true;
    }
    catch (error) {
        console.log("error", error)
        return false;

    }
}


export const mintNft = async (web3, contract, accounts, amount, token_id,
    data, apiUrl, notify, handleLoading, handleNavigate, handleApiTrigger) => {
    console.log("before transaction", contract, accounts, amount, token_id, data);

    try {
        const price = amount.toString();
        let txhashes;
        let tokenIdSupply = await contract.methods
            .totalSupply().call();
        let tId = tokenIdSupply;

        const receipt = await contract.methods
            .mint(token_id, price, data.supply)
            .send({ from: accounts[0] }).on('transactionHash', async (hash) => {
                // ...
                console.log('Received txHash: ', hash);

                let det = await web3.eth.getTransaction(hash);
                console.log('Receiveddeth: ', det);

                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
                let token_id = --tokenIdSupply
                console.log("tokenIdSupply", tokenIdSupply)
                let id = data.id;
                let tx_hash = "true";
                let token_address = "true"
                let name = data.name;
                let owner = accounts[0];
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({
                        id, tx_hash, token_address,
                        token_id, name,owner
                    })
                };
                let submitForm = await fetch(`${apiUrl}update_nft_mint_status`, requestOptions)
                submitForm = await submitForm.json();
                console.log("submitForm", submitForm);
                handleApiTrigger()
                handleLoading()
                // toast.current.show({ severity: 'success', summary: 'Success!', detail: 'Mint Successfully!' });
                notify()
                handleNavigate()
            })
        console.log("receiptsss", receipt)
        return receipt;
    }
    catch (error) {
        console.log("error", error)
        return false;
    }
}

export const changePriceAsync = async (web3, contract, accounts, amount, id,
    data, handleApiTrigger, apiUrl) => {
    console.log("before transaction", contract, accounts, amount, id);

    try {


        const price = amount.toString();
        const receipt = await contract.methods
            .changePrice(price, id)
            .send({ from: accounts[0] }).on('transactionHash', async (hash) => {
                let id = data.id
                let ownerAddress = accounts[0];
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({
                        id, ownerAddress, price
                    })
                };
                let fetchNftData = await fetch(`${apiUrl}resell_nft`, requestOptions);
                handleApiTrigger()

                fetchNftData = await fetchNftData.json();
            });

        console.log("receipt", receipt)
        return true;
    }
    catch (error) {
        console.log("error", error)
        return false;

    }
}
export const lendAsync = async(web3,contract,accounts) =>{
    console.log("contractfunction",contract)


    try{
        let nftPricce = web3.utils.asciiToHex("2000")
        console.log("contractfunctiossn",nftPricce)
        nftPricce = nftPricce.slice(0, 10) 
        console.log("contractfunctiossn",nftPricce)

        let dailyRent = web3.utils.asciiToHex("1000")
        dailyRent = dailyRent.slice(0, 10) 
        console.log("contractfunctiossn",dailyRent)
        let bytes32 = ethers.utils.formatBytes32String("100")
        let receipt = await contract.methods.lend(["0x0db8C099B426677f575D512874D45A767e9acC3c"],["1"],["1"],["60"],["0x000000a0"],["0x000000a0"],["1"]).send({from:accounts[0]});

    }   
    catch(error){
        console.log("error",error)
        return error
    }
}

export const rentAsync = async(web3,contract,accounts) =>{
    try{
    let receipt = await contract.methods.rent(["0x32aa08334e255e8c44b92599e2b43c9587fd5568"],["0"],["0"],["2"]).send({from:accounts[0]});
        return receipt
    }   
    catch(error){
        console.log("error",error)
        return error
    }
}

export const stopLendingAsync = async(web3,contract,accounts) =>{
    try{
    let receipt = await contract.methods.stopLending(["0x32aa08334e255e8c44b92599e2b43c9587fd5568"],["0"],["0"]).send({from:accounts[0]});
        return receipt
    }   
    catch(error){
        console.log("error",error)
        return error
    }
}