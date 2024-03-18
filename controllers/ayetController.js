const User = require("../models/user")
const {updateUserBalance} = require('../utils/ayetUtil')
const {clients} = require("../socket/socket")

const test = (req , res) => {
    res.json('-----------test test test----------')
}
const callbackHandler = (req, res) => {
    const network = req.query.network;
    const amount = req.query.amount;
    const external_identifier = req.query.user_id;
    const payout_usd = req.query.payout_usd;
    const currency_amount = req.query.currency_amount;

    
    
    
    if (clients[external_identifier]) {
        clients[external_identifier].send(JSON.stringify({coins : currency_amount}));
        
        return res.status(200).send('Callback processed and user notified');
    } else {
        updateUserBalance(external_identifier , currency_amount)
        return res.status(200).send('User not connected via WebSocket');
    }

    res.status(200).send('Callback received successfully');
}

module.exports = {
    test,
    callbackHandler
}