export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Vending Machine',
        version: '1.0.1',
        description: 'This is a REST API application made with Express.',
    },
    tags: [
        {
            name: 'Purchases',
            description: 'Endpoints for making purchases'
        },
        {
            name: 'Products',
            description: 'Endpoints related to product management'
        },
        {
            name: 'Product Maintenance',
            description: 'Endpoints for supporting product maintenance and operations for admin users'
        },
        {
            name: "Coins",
            description: "Endpoints for managing coins"
        },
        {
            name: "Coin Maintenance",
            description: "Endpoints for supporting coin maintenance and operations for admin users"
        }
    ],
    servers: [
        {
            url: 'http://localhost:3000/',
            description: 'Pariti Vending Machine server',
        },
    ],
    components: {
        schemas: {
            Product: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        format: 'int64',
                    },
                    name: {
                        type: 'string',
                    },
                    quantity: {
                        type: 'integer',
                    },
                    type: {
                        type: 'string',
                    },
                    price: {
                        type: 'number',
                        format: 'float',
                    },
                },
                required: ['id', 'name', 'quantity', 'type', 'price'],
            },
            CoinInfo: {
                type: 'object',
                properties: {
                    denomination: {type: 'number'},
                    value: {type: 'number'},
                    count: {type: 'number'},
                },
                required: ['denomination', 'value', 'count'],
            },
            Coin: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        format: 'int64',
                    },
                    denomination: {type: 'number'},
                    value: {type: 'number'},
                    quantity: {type: 'number'},
                },
                required: ['denomination', 'value', 'quantity'],
            },
            PurchaseDTO: {
                type: 'object',
                properties: {
                    productId: {type: 'integer'},
                    quantity: {type: 'integer'},
                    coins: {
                        type: 'array',
                        items: {$ref: '#/components/schemas/CoinInfo'},
                    },
                },
                required: ['productId', 'quantity', 'coins'],
            },

            ChangeDenomination: {
                type: 'object',
                properties: {
                    denomination: {type: 'string'},
                    count: {type: 'integer'},
                },
                required: ['denomination', 'count'],
            },
            ChangeDetails: {
                type: 'object',
                properties: {
                    changePossible: {type: 'boolean'},
                    changeAmount: {type: 'number'},
                    changeDenominations: {
                        type: 'array',
                        items: {$ref: '#/components/schemas/ChangeDenomination'},
                    },
                },
                required: ['changePossible', 'changeAmount', 'changeDenominations'],
            },
            Purchase: {
                type: 'object',
                properties: {
                    productId: {type: 'integer'},
                    productName: {type: 'string'},
                    quantity: {type: 'integer'},
                    insertedAmount: {type: 'number'},
                    changeDetails: {$ref: '#/components/schemas/ChangeDetails'},
                },
                required: ['productId', 'productName', 'quantity', 'insertedAmount', 'changeDetails'],
            },
        },

    },
};