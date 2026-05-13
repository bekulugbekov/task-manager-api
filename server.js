import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import router from './src/routes/index.js';
import errorMiddleware from './src/middlewares/error.middleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/swagger.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use('/api', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error middleware har doim oxirida bo'lishi shart!
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(process.env.PORT, () => {
            console.log(`Server ${process.env.PORT} portida ishga tushdi...`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();