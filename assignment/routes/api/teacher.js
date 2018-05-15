const express =require('express');
const router=express.Router();

const teacher = require('../../db').teacher;
const lecture = require('../../db').lecture;
const course = require('../../db').course;
const batch = require('../../db').batch;
var url = require('url');
const db = require('../../db').db;

router.get('/',(req,res)=>{
    teacher.findAll()
    .then((teachers) => {
        res.status(200).send(teachers)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not  retrive teachers"
        })
    })
})

router.post('/', (req,res)=>{
    
    teacher.create({
        name: req.body.name,
        subject_Id: req.body.subjectid

    }).then((teacher)=>{
        res.status(201).send(teacher)
    }).catch((err)=>{
    res.status(501).send({
        error : "could not add teacher "
    })
    })
})

router.get('/:id',(req,res)=>{
    teacher.findAll({
        where: {
            id:req.params.id
          }
        }
    )
    .then((teacher) => {
        res.status(200).send(teacher)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrive teacher"
        })
    })
})

router.get('/:id/batches', (req, res) =>{
    console.log(req.params.id)
    teacher.findAll({

        include: [
            {
                model: subject,
                include: [{
                    model : course,
                    include : [batch]
                }]
            }
        ],
        where : { id : req.params.id},
    }).
    then((teacher)=>{
        res.status(200).send(teacher)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send({
        error : "could not retrieve batches "
    })
    })
});


module.exports=router;