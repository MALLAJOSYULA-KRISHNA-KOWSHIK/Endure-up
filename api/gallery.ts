import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../db';
import Gallery from '../models/Gallery';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const images = await Gallery.find().sort({ createdAt: -1 });
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch gallery' });
    }
  } else if (req.method === 'POST') {
    try {
      const { src, alt, span } = req.body;
      const image = await Gallery.create({ src, alt, span });
      res.status(201).json(image);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create image' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Gallery.findByIdAndDelete(id);
      res.status(200).json({ message: 'Image deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
