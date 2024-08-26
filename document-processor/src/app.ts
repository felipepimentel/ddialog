import express from 'express';
import { processDocument } from './processors/documentProcessor';

const app = express();

app.use(express.json());

app.post('/process', async (req, res) => {
  try {
    const result = await processDocument(req.body.documentUrl);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Document processing failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Document processor running on port ${PORT}`);
});

export default app;