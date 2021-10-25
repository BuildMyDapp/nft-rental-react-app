export const RENTAL_ADDRESS = "0xc02a69fB3eeA97ff0B5C1970012D44f35694D81a";
export const RENTAL_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_resolver",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "_beneficiary",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "lendingId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "claimedAt",
				"type": "uint32"
			}
		],
		"name": "CollateralClaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "lendingId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "stoppedAt",
				"type": "uint32"
			}
		],
		"name": "LendingStopped",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "nftAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "lentAmount",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lendingId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "lenderAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "maxRentDuration",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "bytes4",
				"name": "dailyRentPrice",
				"type": "bytes4"
			},
			{
				"indexed": false,
				"internalType": "bytes4",
				"name": "nftPrice",
				"type": "bytes4"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isERC721",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "enum IResolver.PaymentToken",
				"name": "paymentToken",
				"type": "uint8"
			}
		],
		"name": "Lent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lendingId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "renterAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "rentDuration",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "rentedAt",
				"type": "uint32"
			}
		],
		"name": "Rented",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "lendingId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "returnedAt",
				"type": "uint32"
			}
		],
		"name": "Returned",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ERC20Token",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_nfts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_tokenIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_lendingIds",
				"type": "uint256[]"
			}
		],
		"name": "claimCollateral",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_nfts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_tokenIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_lendAmounts",
				"type": "uint256[]"
			},
			{
				"internalType": "uint8[]",
				"name": "_maxRentDurations",
				"type": "uint8[]"
			},
			{
				"internalType": "bytes4[]",
				"name": "_dailyRentPrices",
				"type": "bytes4[]"
			},
			{
				"internalType": "bytes4[]",
				"name": "_nftPrices",
				"type": "bytes4[]"
			},
			{
				"internalType": "enum IResolver.PaymentToken[]",
				"name": "_paymentTokens",
				"type": "uint8[]"
			}
		],
		"name": "lend",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155BatchReceived",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_nfts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_tokenIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_lendingIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint8[]",
				"name": "_rentDurations",
				"type": "uint8[]"
			}
		],
		"name": "rent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rentFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_nfts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_tokenIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_lendingIds",
				"type": "uint256[]"
			}
		],
		"name": "returnIt",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_newBeneficiary",
				"type": "address"
			}
		],
		"name": "setBeneficiary",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_paused",
				"type": "bool"
			}
		],
		"name": "setPaused",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rentFee",
				"type": "uint256"
			}
		],
		"name": "setRentFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_nfts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_tokenIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_lendingIds",
				"type": "uint256[]"
			}
		],
		"name": "stopLending",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "whatPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

//uri
//https://rinkeby.etherscan.io/address/0x8ec346712ef9c59c13c52599b0be37bf183e13de#code