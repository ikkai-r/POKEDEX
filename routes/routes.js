import express from 'express';
import controller from '../controllers/controller.js';

const app = express();

app.get('/', controller.getIndex);

export default app;
