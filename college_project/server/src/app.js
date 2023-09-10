import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userModel from './models/user.schema'


const app = express()
const PORT = process.env.PORT || 9000

dotenv.config()

// database
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log('Connected to Database'))


// middlewares
app.use(express.json())
app.use(cors())

app.post('/register', async (req, res) => {
    const {username, password, email, phone} = req.body

    const user = await userModel.findOne({email})
    if(user){
        return res.status(400).json({error: 'Email already registered!'})
    }

    const newUser = new userModel({username, email, password, phone})
    await newUser.save()
    return res.json(newUser)
})
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });