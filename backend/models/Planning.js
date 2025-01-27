const mongoose = require('mongoose');

const PlanningSchema = new mongoose.Schema({
    workerId: { type: String, required: true, },
    startDate: { type:  Date, required: true,},
    endDate: { type:  Date, required: true,},
    description: { type: String },
    machineId: { type: String },
})

const PlanningAddSchema = new mongoose.Schema({
    
})

const PlanningModel = mongoose.model('plannings', PlanningSchema, 'plannning')
const PlanningAddModel = mongoose.model('planningsAdd', PlanningAddSchema, 'planning')

module.exports = { PlanningModel, PlanningAddModel }