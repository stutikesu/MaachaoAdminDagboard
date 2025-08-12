import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        if (connect) {
            // console.log(connect.connection.host);
            console.log(`[${new Date()}]...mongodb connected`);
        }
    } catch (e) {
        console.log(`[${new Date()}]...${e}`);
    }
}

export default connectDb;