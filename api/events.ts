import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../db';
import Event from '../models/Event';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const events = await Event.find().sort({ date: 1 });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, date, description, location } = req.body;
      const event = await Event.create({ title, date, description, location });
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create event' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Event.findByIdAndDelete(id);
      res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete event' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
