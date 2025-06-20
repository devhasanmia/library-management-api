import express, { Application, Request, Response } from 'express';
const app: Application = express();
app.use(express.json())

// Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Library Management API Server',
    status: 'Running',
    version: '1.0.0',
    documentation: '/api/docs'
  });
});

export default app;
