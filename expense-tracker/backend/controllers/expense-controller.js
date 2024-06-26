const Expense = require('../models/expense');

module.exports = {
    addExpense: async function (req, res) {
        try {
            const newExpense = new Expense({
                userId: req.userData.userId,
                date: req.body.date,
                amount: req.body.amount,
                category: req.body.category,
                description: req.body.description,
                paymentMethod: req.body.paymentMethod
            });
            const result = await newExpense.save();
            res.status(201).json({ message: "Expense added!", result: result });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },


};