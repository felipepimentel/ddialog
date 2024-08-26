import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import workspaceRoutes from './routes/workspaceRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/workspaces', workspaceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;