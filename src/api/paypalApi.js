let baseUrl = 'https://api-m.sandbox.paypal.com';
const base64 = require('base-64');

let clientId = 'AUv8rrc_P-EbP2E0mpb49BV7rFt3Usr-vdUZO8VGOnjRehGHBXkSzchr37SYF2GNdQFYSp72jh5QUhzG';
let secretKey = 'EMnAWe06ioGtouJs7gLYT9chK9-2jJ--7MKRXpI8FesmY_2Kp-d_7aCqff7M9moEJBvuXoBO4clKtY0v';

let orderDetail ={
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "items": [
                    {
                        "name": "T-Shirt",
                        "description": "Green XL",
                        "quantity": "1",
                        "unit_amount": {
                            "currency_code": "USD",
                            "value": "100.00"
                        }
                    }
                ],
                "amount": {
                    "currency_code": "USD",
                    "value": "100.00",
                    "breakdown": {
                        "item_total": {
                            "currency_code": "USD",
                            "value": "100.00"
                        }
                    }
                }
            }
        ],
        "application_context": {
            "return_url": "https://example.com/return",
            "cancel_url": "https://example.com/cancel"
        }
}

const generateToken = () => {
    var headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + base64.encode(`${clientId}:${secretKey}`)
    };

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: 'grant_type=client_credentials',
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v1/oauth2/token', requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log("Response Body:", result);
                const { access_token } = JSON.parse(result);
                resolve(access_token);
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                reject(error);
            });
    });
}

const capturePayment = (id, token = '') => {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/v2/checkout/orders/${id}/capture`, requestOptions) 
            .then(response => response.text())
            .then(result => {
                console.log("Response Body:", result);
                const res = JSON.parse(result);
                resolve(res);
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                reject(error);
            });
    });
}

const createOrder = (token = '') => {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderDetail)
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v2/checkout/orders', requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log("Response Body:", result);
                const res = JSON.parse(result);
                resolve(res);
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                reject(error);
            });
    });
}

export default {
    generateToken, createOrder, capturePayment
}