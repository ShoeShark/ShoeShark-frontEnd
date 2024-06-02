export const CONTENT_AUDITOR = {
    address: "0xC38915d659EAEd4699b986B8b3362389f29cE6Bf",
    abi: [
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "subscriptionId",
                    "type": "uint64"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "EmptyArgs",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "EmptySource",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "NoInlineSecrets",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "OnlyRouterCanFulfill",
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
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "requestId",
                    "type": "bytes32"
                }
            ],
            "name": "RequestFailed",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "requestId",
                    "type": "bytes32"
                }
            ],
            "name": "UnexpectedRequestID",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "requestId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "result",
                    "type": "bool"
                }
            ],
            "name": "AuditCompleted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "requestId",
                    "type": "bytes32"
                }
            ],
            "name": "AuditFailed",
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
                    "internalType": "bytes32",
                    "name": "id",
                    "type": "bytes32"
                }
            ],
            "name": "RequestFulfilled",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "id",
                    "type": "bytes32"
                }
            ],
            "name": "RequestSent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "requestId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "character",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "response",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "err",
                    "type": "bytes"
                }
            ],
            "name": "Response",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                }
            ],
            "name": "getAllTaskByAuthor",
            "outputs": [
                {
                    "internalType": "bytes32[]",
                    "name": "tasks",
                    "type": "bytes32[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "requestId",
                    "type": "bytes32"
                }
            ],
            "name": "getResult",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "bool",
                            "name": "exists",
                            "type": "bool"
                        },
                        {
                            "internalType": "address",
                            "name": "author",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "hash",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "old_hash",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct ShoeSharkAuditor.RequestDetails",
                    "name": "detail",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "requestId",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes",
                    "name": "response",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes",
                    "name": "err",
                    "type": "bytes"
                }
            ],
            "name": "handleOracleFulfillment",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                    "internalType": "string",
                    "name": "_content",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_author",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "old_hash",
                    "type": "string"
                }
            ],
            "name": "reviewContent",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "s_lastError",
            "outputs": [
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "s_lastRequestId",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "s_lastResponse",
            "outputs": [
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract ShoeSharkContentManager",
                    "name": "_contentManager",
                    "type": "address"
                }
            ],
            "name": "setContentManager",
            "outputs": [],
            "stateMutability": "nonpayable",
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
        }
    ]
} as const
