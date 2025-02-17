const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    category: { type: String, required: true, },
    count: { type: Number, required: true, },
    unit: { type: String, required: true, },
    history: { type: Array },
})

const warehouseAddSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    category: { type: String, required: true, },
    count: { type: Number },
    unit: { type: String, required: true, },
    history: { type: Array },
})

const warehousePutSchema = new mongoose.Schema({
    history: { type: Array },
})

const WarehouseModel = mongoose.model('warehouse', warehouseSchema, 'warehouse')
const WarehouseAddModel = mongoose.model('warehouseAdd', warehouseAddSchema, 'warehouse')
const WarehousePutModel = mongoose.model('warehousePut', warehousePutSchema, 'warehouse')

module.exports = { WarehouseModel, WarehousePutModel, WarehouseAddModel }