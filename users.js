const User = require('./models/user')
// Function to update user balance
async function updateUserBalance(userId, amount) {
    try {
        amount = parseInt(amount, 10); // Ensure amount is a number
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
//take money from the user 
// async function getMoneyFromUser(userId) {
//     try {
//         // First, find the user to get the current balance
//         const user = await User.findOne({ userId: userId });
//         if (!user) {
//             console.log('User not found');
//             return 0; // User not found, return 0 balance
//         }

//         const currentBalance = user.amount; // Store the current balance
//         console.log(currentBalance)
//         // Now, update the user's balance to 0
//         await User.updateOne(
//             { userId: userId },
//             { $set: { amount: 0 } } // Reset amount to 0
//         );

//         return currentBalance; // Return the balance before resetting
//     } catch (error) {
//         console.error('Error getting money from user:', error);
//         return 0;
//     }
// }


// Export the functions for use in other files
module.exports = {
    updateUserBalance,
    getUserBalance,
    
};