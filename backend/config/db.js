import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`localhost:port`, {
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

export default connectDB;