const Lembur = require('../models/lembur')
const mongoose = require('mongoose')

exports.lembur_get_all = (req, res, next) => {
    Lembur.find()
        .select('-__v')
        .exec()
        .then(docs => {
            const response = {
                total: docs.length,
                data: docs
            }
            // if(docs.length >= 0){
            res.status(200).json(response)
            // }else {
            //     res.status(404).json({
            //         message: 'No entries'
            //     })
            // }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.lembur_create = async (req, res, next) => {
    let count = ( "000" + (await Lembur.countDocuments({}) + 1 )).slice(-3)
    let now = new Date()
    let y2d = now.getFullYear().toString().substr(-2)
    let m2d = ("0" + (now.getMonth() + 1)).slice(-2)
    let d2d = ("0" + (now.getDate())).slice(-2)
    let documentId = `${y2d}/${m2d}/${d2d}/${count}`
    let createdDate = `${d2d}/${m2d}/${y2d}`

    const lembur = new Lembur({
        _id: new mongoose.Types.ObjectId(),
        documentId: documentId,
        createdDate: createdDate,
        assignee: req.body.assignee,
        assigner: req.body.assigner,
        reasons: req.body.reasons,
        time: req.body.time,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        // lemburImage: req.file.path
    })
    lembur
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Created form successfully!",
                data: lembur
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

}

exports.lembur_get_one = (req, res, next) => {
    const id = req.params.lemburId
    Lembur.findById(id)
        .select('-__v')
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({
                    message: 'No valid'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}

exports.lembur_patch = (req, res, next) => {
    const id = req.params.lemburId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Lembur.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({ result })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.lembur_delete = (req, res, next) => {
    const id = req.params.lemburId
    Lembur.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Deleted'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}