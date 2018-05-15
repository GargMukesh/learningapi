const express =require('express');
const router=express.Router();

const student = require('../../db').student;
const batch = require('../../db').batch;
const studentbatchmapping = require('../../db').studentbatchmapping;
var url = require('url');
const db = require('../../db').db;

router.post('/', (req,res)=>{
   
    student.create({
        name: req.body.name
    }).then((student)=>{
    res.status(201).send(student)
    }).catch((err)=>{
        console.log(err)
        res.status(501).send({
        error : "could not add student "
    })
    })
})

router.get('/',(req,res)=>{
    student.findAll()
    .then((students) => {
        res.status(200).send(students)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrive students"
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
            error: "Could not retrive subject"
        })
    })
})

router.get('/:id/batches', (req, res) =>{

    studentbatchmapping.findAll({

        where : { student_id : req.params.id},
        include:[batch,student]
    }).
    then((students)=>{
        res.status(200).send(students)
    })
    .catch((err)=>{
        res.status(500).send({
        error : "could not retrieve students "
    })
    })
});

module.exports=router;