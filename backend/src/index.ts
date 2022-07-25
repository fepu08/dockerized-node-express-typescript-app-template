import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const port = process.env.PORT || 5000;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: 'Hello World!' });
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
