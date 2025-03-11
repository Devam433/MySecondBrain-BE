import express from "express";
import authRouter from "./routes/authRoute.js";
import contentRouter from "./routes/contentRoute.mjs";
import shareLinkRouter from "./routes/shareLinkRoute.js";
import searchTagsRoute from "./routes/searchTagsRoute.js";
import searchRoute from "./routes/searchRoute.mjs";
import { config } from "dotenv";
import { connectMongoDB } from "./config/mongodb.js";
config();
const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRouter.default);
app.use('/api/v1/content', contentRouter);
app.use('/api/v1/share', shareLinkRouter.default);
app.use('/api/v1', searchTagsRoute.default);
app.use('/api/v1', searchRoute);
async function main() {
    if (!process.env.connection_string) {
        throw new Error('Environment variable connection_string is not set');
    }
    try {
        await connectMongoDB(process.env.connection_string);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.log('Error at startup');
    }
}
main();
