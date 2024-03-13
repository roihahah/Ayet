const User = require('./models/user')
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



// Export the functions for use in other files
module.exports = {
    updateUserBalance,
    
    
};
