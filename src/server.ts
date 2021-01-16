import * as dotenv from 'dotenv'
import * as express from 'express'
import * as api from './routes/api'
import * as bp from 'body-parser'
const app = express()

// middleware
app.use(express.json())
app.use(bp.urlencoded({
    extended: true
}));

dotenv.config()

// Hello World
app.get('/', (request:any, response:any) => {
    response.send('Hello World')
})


// start server
const PORT = process.env.PORT
app.listen(PORT, () => {
     console.log(`Up and running in http://localhost:${PORT}`)
})

api.register(app) // /api

