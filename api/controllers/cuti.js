const Cuti = require('../models/cuti')
const Lembur = require('../models/lembur')
const mongoose = require('mongoose')

exports.cuti_get_all =  (req, res, next) => {
    Cuti.find()
    .select('-__v')
    .exec()
    .then(docs => {
        res.status(200).json({
            total: docs.length,
            data: docs
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
}

exports.cuti_create = (req, res, next) => {
    Lembur.findById(req.body.lemburId)
    .then(lembur => {
        if(!lembur){
            return res.status(404).json({
                message: 'lemburID not found'
            })
        }
        const cuti = new Cuti({
            _id: mongoose.Types.ObjectId(),
            name: req.body.lemburId,
            daysLong: req.body.daysLong,
            reasons: req.body.reasons,
            startTime: req.body.startTime
        })
        return cuti.save()
    })
    .then(result => {
        console.log(result)
        res.status(201).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
}

exports.cuti_get_one = (req, res, next) => {
    Cuti.findById(req.params.cutiId)
    .exec()
    .then(cuti => {
        if(!cuti){
            res.status(404).json({message:'cuti\'s ID is not found'})
        }
        res.status(200).json(cuti)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
}

exports.cuti_delete = (req, res, next) => {
    Cuti.remove({_id:req.params.cutiId})
    .exec()
    .then(result => {
        if(!result){
            res.status(404).json({message:'cuti\'s ID not found'})
        }
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
}