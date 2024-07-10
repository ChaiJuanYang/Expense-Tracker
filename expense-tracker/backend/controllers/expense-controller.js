const mongoose = require('mongoose');
const Expense = require('../models/expense');

module.exports = {
    addExpense: async function (req, res) {
        try {
            const newExpense = new Expense({
                userId: req.body.userId,
                date: req.body.date,
                amount: req.body.amount,
                category: req.body.category,
                description: req.body.description,
                paymentMethod: req.body.paymentMethod
            });
            const result = await newExpense.save();
            console.log("Result : ",result);
            res.status(201).json({ message: "Expense added!", result: result });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getExpense: async function (req, res) {
        const userId = req.body.userId;
        console.log("User ID: ", userId);
        try {
            const expenses = await Expense.find({ userId: req.body.userId });
            // res.json({ expenses: expenses });
            console.log("Expenses: ", expenses);
            res.status(200).json( expenses );
        } catch (err) { 
            res.status(500).json({ error: err.message });
        }
    }
}