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
const { request, response } = require('express')

const app = express()

app.use('/uploads',express.static('uploads'))

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/developer', developerRouter)
app.use('/recruiter', recruiterRouter)
app.use('/developer/bio', bioDevRouter)
app.use('/recruiter/bio', bioRecRouter)
app.use('/developer/skill', skillRouter)
app.use('/developer/port', portRouter)
app.use('/developer/exp', expRouter)
app.use('/recruiter/project', prjRouter)
app.use('/recruiter/project/dev', prjDevRouter)

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