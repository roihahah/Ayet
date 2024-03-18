const User = require('../models/user')
// Function to update user balance
async function updateUserBalance(userId, amount) {
    try {
        amount = parseInt(amount, 10); 
        const user = await User.findOneAndUpdate(
            { userId: userId },
            { $inc: { amount: amount } }, // Increment user's amount
            { new: true, upsert: true } // Options to return the updated object and create it if it doesn't exist
        );
        console.log(`User ${userId} balance updated to ${user.amount}`);
    } catch (error) {
        console.error('Error updating user balance:', error);
    }
}

async function sendUserMoney(ws,userId) {
    let amount = 0
    try {
        const user = await User.findOne({ userId: userId }).exec();
        if (user) {
            // User found, send userId and coins as an integer
              amount = user.amount
            ws.send(JSON.stringify(amount))
            await User.updateOne(
                { userId: userId },
                { $set: { amount: 0 } } // Reset amount to 0
            );
           
        }

    } catch (error) {
        console.error('Error fetching user:', error);
       
    }

}






// Export the functions for use in other files
module.exports = {
    updateUserBalance,
    sendUserMoney,
   
    
    
};
