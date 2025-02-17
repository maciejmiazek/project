const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
    balance: { type: Number, required: true, },
    costs: { type: Array, required: true, },
    dateId: { type: Object },
    gains: { type: Array, required: true, },
})

const financeAddSchema = new mongoose.Schema({
    costs: { type: Array },
    dateId: { type: Object },
    gains: { type: Array },
})

const financePutSchema = new mongoose.Schema({
    history: { type: Array },
})

const FinanceModel = mongoose.model('finance', financeSchema, 'finance')
const FinanceAddModel = mongoose.model('financeAdd', financeAddSchema, 'finance')
const FinancePutModel = mongoose.model('financePut', financePutSchema, 'finance')

module.exports = { FinanceModel, FinancePutModel, FinanceAddModel }