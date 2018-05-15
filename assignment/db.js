const Sequelize = require('sequelize');
const Op = Sequelize.Op
const db = new Sequelize('learningdb', 'learner', 'learner', {
    host: 'localhost',
    dialect: 'mysql',

    logging: console.log()
});


const course = db.define('course', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
   
})


const student = db.define('student', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING(30),
        unique: false,
        allowNull: false,
    }
   
})

const teacher = db.define('teacher', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING(30),
        unique: false,
        allowNull: false,
    },

    subject_id: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model subject
            model: subject,

            // This is the column name of the referenced model subject
            key: 'id'
        }
    }
   
})

const batch = db.define('batch', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    },
    course_id: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model course
            model: course,

            // This is the column name of the referenced model course
            key: 'id'
        }
    }
   
});


const subject = db.define('subject', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    },
    course_id: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model course
            model: course,

            // This is the column name of the referenced model course
            key: 'id'
        }
    },
    // teacher_id: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //         // This is a reference to another model teacher
    //         model: teacher,

    //         // This is the column name of the referenced model teacher
    //         key: 'id'
    //     }
    // }
   
});


const lecture = db.define('lecture', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
   
    batch_id: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model vendor
            model: batch,

            // This is the column name of the referenced model vendor
            key: 'id'
        }
    },
    subject_id: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model vendor
            model: subject,

            // This is the column name of the referenced model vendor
            key: 'id'
        }
    },
    teacher_id: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model vendor
            model: teacher,

            // This is the column name of the referenced model vendor
            key: 'id'
        }
    }
   
});


const studentbatchmapping = db.define('studentbatchmapping', {
  
    batch_id: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model vendor
            model: batch,

            // This is the column name of the referenced model vendor
            key: 'id'
        }
    },
    student_id: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model vendor
            model: student,

            // This is the column name of the referenced model vendor
            key: 'id'
        }
    }
   
});



db.sync()

    .then(() => console.log("Database has been created"))
    .catch((err) => console.log("Error in creating database"))

    exports = module.exports = {db, course, batch, teacher, student, lecture,
                                subject,studentbatchmapping }