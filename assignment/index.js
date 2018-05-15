/* created by mukesh garg (3147196)
*/


const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', require('./routes/api/index'));

 express()
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))



app.listen(PORT);

