const express =require('express');
const router=express.Router();

const course = require('../../db').course;
const batch = require('../../db').batch;
const lecture = require('../../db').lecture;
const student = require('../../db').student;
const teacher= require('../../db').teacher;
const studentbatchmapping = require('../../db').studentbatchmapping;



var url = require('url');
const db = require('../../db').db;

router.post('/', (req,res)=>{
   
        course.create({
        name: req.body.name
    }).then((course)=>{
        res.status(201).send(course)
    }).catch((err)=>{
        console.log(err)
        res.status(501).send({
        error : "could not add course "
    })
    })
})

router.get('/',(req,res)=>{
    course.findAll()
    .then((courses) => {
        res.status(200).send(courses)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrive courses"
        })
    })
})

router.get('/:id',(req,res)=>{
    course.findAll({
        where: {
            id:req.params.id
          }
        }
    )
    .then((course) => {
        res.status(200).send(course)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrive course"
        })
    })
})


router.get('/:courseId/batches', (req, res) =>{
   batch.findAll({
        include: [
            {
                model: course
            }
        ],
        where : { course_id : req.params.courseId}
    }).
    then((batches)=>{
        res.status(200).send(batches)
    })
    .catch((err)=>{
        res.status(500).send({
        error : "could not retrieve batches "
    })
    })
});

router.get('/:courseId/batches/:batchId', (req, res) =>{
    batch.findAll({
        include: [
            {
                model: course
            }
        ],
        where : {
            course_id : req.params.courseId,
            id : req.params.batchId
        }
    }).
    then((course)=>{
        res.status(200).send(course)
    })
    .catch((err)=>{
        res.status(500).send({
        error : "could not retrieve Course "
    })
    })
});

router.get('/:courseId/batches/:batchId/lectures', (req, res) =>{
    lecture.findAll({

        where : {
            batch_id : req.params.batchId
        },
        include: [
            {
                model: batch,
                include:[course]
            }
        ]
    }).
    then((course)=>{
        res.status(200).send(course)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send({
        error : "could not retrieve Course "
    })
    })
});

router.get('/:courseId/batches/:batchId/lectures/:lectureid', (req, res) =>{
    lecture.findAll({

        where : {
            id : req.params.lectureid,
            batch_id : req.params.batchId
        },
        include: [
            {
                model: batch,
                include:[course]
            }
        ]
    }).
    then((course)=>{
        res.status(200).send(course)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send({
        error : "could not retrieve Course "
    })
    })
});

router.get('/:courseId/batches/:batchId/students', (req, res) =>{
    studentbatchmapping.findAll({
     where : {
            batch_id : req.params.batchId
        },
        include: [student,{

                        model:batch,
                        include :[course]
                }],
    }).
    then((course)=>{
        res.status(200).send(course)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send({
        error : "could not retrieve Course "
    })
    })
});

router.get('/:courseId/batches/:batchId/teachers', (req, res) =>{
    lecture.findAll({
      where : {
            batch_id : req.params.batchId
        },
        include: [teacher,{

                        model:batch,
                        include :[course]
                }],
    }).
    then((course)=>{
        res.status(200).send(course)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send({
        error : "could not retrieve Course "
    })
    })
});

module.exports=router;