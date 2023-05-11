import mongoose from "mongoose"
import dotenv from "dotenv"
import users from "./data/users"
import notes from "./data/notes"
import User from "./models/userModel"
import Note from "./models/noteModel"
import connectDB from "./config/db"

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Note.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleNotes = notes.map(note => {
            return {...note, user: adminUser}
        })

        await Note.insertMany(sampleNotes)

        console.log("data imported")
        process.exit()
    }
    catch(error) {
        console.error(error)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Note.deleteMany()
        await User.deleteMany()

        console.log("data destroyes")
        process.exit()
    }
    catch(error) {
        console.error(error)
        process.exit(1)
    }
}

if(process.argv[2] === "-d") {
    destroyData()
} else {
    importData()
}