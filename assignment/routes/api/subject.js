const express =require('express');
const router=express.Router();

const subject = require('../../db').subject;
const teacher = require('../../db').teacher;
var url = require('url');
const db = require('../../db').db;

router.get('/',(req,res)=>{
    subject.findAll()
    .then((subjects) => {
        res.status(200).send(subjects)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve subjects"
        })
    })
})

router.get('/:id',(req,res)=>{
    subject.findAll({
        where: {
            id:req.params.id
          }
        }
    )
    .then((subject) => {
        res.status(200).send(subject)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could  not retrive subject"
        })
    })
})


router.get('/:id/teachers', (req, res) =>{

    teacher.findAll({

        where : { subject_id : req.params.id},
    }).
    then((teachers)=>{
        res.status(200).send(teachers)
    })
    .catch((err)=>{
        res.status(500).send({
        error : "could not retrieve teachers "
    })
    })
});

module.exports=router;