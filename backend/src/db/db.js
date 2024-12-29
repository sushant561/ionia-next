import mongoose from "mongoose";
import { DB_NAME} from "../constants.js";

const connectDB = async () => {


    try {
        // For local connection
        // const dbUriLocal = `${process.env.DATABASE_LOCAL}/${DB_NAME}`;
        // console.log("Connection started with: " , dbUriLocal);
        // const connectionInstanceLocal = await mongoose.connect(`${process.env.DATABASE_LOCAL}/${DB_NAME}`);
        // console.log(`\nMongoDB connected !! DB HOST: ${connectionInstanceLocal.connection.host}`);

        // For online connection    
        const dbUri = process.env.DATABASE_ATLAS.replace("<DB_NAME>", DB_NAME);
        console.log("Connection started with: " , dbUri);
        const connectionInstance = await mongoose.connect(dbUri);
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (err) {
        console.log("MONGOB connection error: " + err);
        process.exit(1);
    }


}

export default connectDB; 
