const mongoose = require('mongoose');
const Expense = require('../models/expense');
const ObjectId = mongoose.Types.ObjectId;
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
            // Find the expenses and sort them by date
            const expenses = await Expense.find({ userId: req.body.userId }).sort({ date: -1 }); // -1 for descending order, 1 for ascending order
            console.log("Expenses: ", expenses);
            res.status(200).json(expenses);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteExpense: async function (req, res) {
        const expenseId = req.params.id;
        try {
            const result = await Expense.deleteOne({ _id: expenseId });
            res.status(200).json({ message: "Expense deleted!", result: result });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateExpense: async function (req, res) {
        const id = req.body._id;
        console.log("Expense ID: ", id);
            try {
                const result = await Expense.findOneAndUpdate({ _id: id }, {
                    $set: {
                        date: req.body.date,
                        amount: req.body.amount,
                        category: req.body.category,
                        description: req.body.description,
                        paymentMethod: req.body.paymentMethod
                    }
                });
                res.status(200).json({ message: "Expense updated!", result: result });
            } catch (err) {
                res.status(500).json({ error: err.message });
        }
    },

    displayExpense: async function (req, res) {
        const userId = req.body.userId;
        const year = parseInt(req.body.year);
        const month = parseInt(req.body.month);
        console.log("User ID: ", userId);
        console.log("Year: ", year);
        console.log("Month: ", month);
        try {
            const expenses = await Expense.aggregate([
                {$match : { userId: new mongoose.Types.ObjectId(userId) ,  $expr: {
                    $and: [
                        { $eq: [{ $year: "$date" }, year] },
                        { $eq: [{ $month: "$date" }, month] }
                    ]
                }}},
                { 
                    $group: { 
                        _id: null, 
                        total: { $sum: "$amount" } 
                    } 
                }
            ]    
            );
    
            console.log("Expenses:", expenses);
            res.status(200).json(expenses);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }}
    // }
    // const userId = req.body.userId;
    // console.log("User ID: ", userId);
    // try {
    //     const expenses = await Expense.aggregate([
    //         { $match: { userId: userId } },
    //     ]);

    //     console.log("Expenses: ", expenses);
    //     res.status(200).json(expenses);
    // } catch (err) {
    //     res.status(500).json({ error: err.message });
    // }},
};