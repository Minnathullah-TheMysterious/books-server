import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './db/mongo'
import bookRoute from './routes/bookRoute'
import cors from 'cors'

const app:express.Application = express()
dotenv.config()

const port = process.env.PORT

//Connect to database
dbConnect()

app.use(cors())
app.use(express.json())

//Routes
app.use('/api/v1/book', bookRoute)

app.get('*', (req:express.Request, res:express.Response)=>{
    res.status(404).send('Not Found')
})

app.listen(port, ()=>{console.log('App listening on port ' + port)})
