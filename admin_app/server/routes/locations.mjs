import { Router } from 'express';
const router = Router();

// Define a route that uses the MongoDB connection
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.services.db;
    const allLocations = await db.findDocuments('locations', {});

    console.log(`returning locations: ${allLocations}`)
    res.json(allLocations);
  } catch (error) {
    console.error('Error handling API request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;