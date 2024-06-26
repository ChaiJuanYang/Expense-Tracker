const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' },
  date: { 
    type : Date ,
    required: true,
  },
  amount: {
    type : Number,
    required: true,
  },
  category: {
    type : String, 
    required: true,
  },
  description: { 
    type : String
 },
  paymentMethod: {
    type : String
}
});

const Expense = mongoose.model('Expense', expenseSchema);
