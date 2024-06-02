export const CONTENT_MANAGER = {
    address: "0xBEF25243bdC2Ad420Be0B997B0602377F138fC84",
    abi: [
        {
            "inputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "_token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_minWithdrawAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_minSponsorAmount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "ContentContract__AlreadyExists",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "ContentContract__ContentNotFound",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "ContentContract__InvalidIPFSHash",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "ContentContract__NoSponsorship",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "ContentContract__NotAuditor",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "ContentContract__NotContentOwner",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "ContentContract__TransferFailed",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "ipfsHash",
                    "type": "string"
                }
            ],
            "name": "ContentAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "ipfsHash",
                    "type": "string"
                }
            ],
            "name": "ContentDeleted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "oldIpfsHash",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "newIpfsHash",
                    "type": "string"
                }
            ],
            "name": "ContentUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sponsor",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Sponsored",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "ipfsHash",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                }
            ],
            "name": "addContent",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "requestId",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "ipfsHash",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                }
            ],
            "name": "addContentByAuditor",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "ipfsHash",
                    "type": "string"
                }
            ],
            "name": "deleteContent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllContent",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "ipfsHash",
                    "type": "string"
                }
            ],
            "name": "getContentDetails",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "ipfsHash",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "author",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "sponsor",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ShoeSharkContentManager.Content",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "ipfsHash",
                    "type": "string"
                }
            ],
            "name": "getContentSponsorship",
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
            "inputs": [],
            "name": "minSponsorAmount",
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
            "inputs": [],
            "name": "minWithdrawAmount",
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
            "inputs": [],
            "name": "owner",
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
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract ShoeSharkAuditor",
                    "name": "_auditor",
                    "type": "address"
                }
            ],
            "name": "setAIAuditor",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "ipfsHash",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "sponsorContent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "token",
            "outputs": [
                {
                    "internalType": "contract IERC20",
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
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "oldIpfsHash",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "newIpfsHash",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                }
            ],
            "name": "updateContent",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "requestId",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "oldIpfsHash",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "newIpfsHash",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                }
            ],
            "name": "updateContentByAuditor",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "ipfsHash",
                    "type": "string"
                }
            ],
            "name": "withdrawSponsorship",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
} as const
