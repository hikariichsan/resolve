const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const developerRouter = require('./src/routes/developer')
const recruiterRouter = require('./src/routes/recruiter')
const bioDevRouter = require('./src/routes/biodev')
const bioRecRouter = require('./src/routes/biorec')
const skillRouter = require('./src/routes/skill')
const portRouter = require('./src/routes/port')
const expRouter = require('./src/routes/exp')
const prjRouter = require('./src/routes/project')
const prjDevRouter = require('./src/routes/prodev')
const hireRouter = require('./src/routes/hire')
const { request, response } = require('express')

const app = express()

app.use('/uploads',express.static('uploads'))

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/developer', developerRouter)
app.use('/recruiter', recruiterRouter)
app.use('/bio-developer', bioDevRouter)
app.use('/bio-recruiter', bioRecRouter)
app.use('/skill', skillRouter)
app.use('/port', portRouter)
app.use('/exp', expRouter)
app.use('/project', prjRouter)
app.use('/project-dev', prjDevRouter)
app.use('/hire', hireRouter)

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Tyoe, Accept, Authorization')
    next()
})

app.get('/',(_request, response)=>{
    response.send('Value App')
})

app.listen(process.env.PORT,()=>{
    console.log(`listening Port ${process.env.PORT} maas`)
})