const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const User = require('./models/user')
const app = express();
const {updateUserBalance} = require('./users')
app.use(express.json());


mongoose.connect(process.env.MONGO_URL).then(() =>{
    console.log('--DATABASE CONNECTED SECCUCFULLY')
}).catch((err) => console.log('--DATABASE CONNECTION FAILD :(' , err))

app.get('/get' , (req, res) => {
    
    res.send("hey2")
})
app.get('/check', async (req, res) => {
    const userId = req.query.userId;

    try {
        const user = await User.findOne({ userId: userId }).exec();
        if (user) {
            // User found, send userId and coins as an integer
            const amount = user.amount
            await User.updateOne(
                { userId: userId },
                { $set: { amount: 0 } } // Reset amount to 0
            );
            res.json({ userId: user.userId, coins: amount });
        } else {
            // User not found, send userId and 0 coins
            res.json({ userId, coins: 0 });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/callback', (req, res) => {
    // Example payload validation - ensure to check against ayet's documentation for exact parameters
    const network = req.query.network;
    const amount = req.query.amount;
    const external_identifier = req.query.external_identifier;
    const payout_usd = req.query.payout_usd;
    const currency_amount = req.query.currency_amount;

    console.log(currency_amount)
    updateUserBalance(external_identifier , currency_amount)
    
    res.status(200).send('Callback received successfully');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

function updateUserCoinBalance(userId, coinsEarned) {
    // Implement logic to update the user's coin balance in your database
}