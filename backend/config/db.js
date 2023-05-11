import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/react-crud-app', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        console.log(`database connected: ${conn.connection.host}`)
    }
    catch(error) {
        console.error(`error: ${error.message}`)
        process.exit()
    }
}

export default connectDB