const mongoose = require('mongoose')

const lemburSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    documentId: { type: String, required: true },
    createdDate: { type: String, required: true },
    assignee: { type: String, required: true },
    assigner: { type: String, required: true },
    reasons: { type: Array, required: true},
    time: { type: Date, required: true },
    startTime: { type: Date, default: '17:00',required: true },
    endTime: { type: Date, required: true },
    // lemburImage: { type: String, required: true }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Lembur', lemburSchema)