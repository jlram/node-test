import * as express from 'express'

const app = express()

app.get('/', (request:any, response:any) => {
    response.send('Hello World')
})

app.get('/hola', (request:any, response:any) => {
    response.send('Hola Mundo')
})


const PORT = 8080
app.listen(PORT, () => {
     console.log(`Up and running in http://localhost:${PORT}`)
})

