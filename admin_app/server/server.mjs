import express from 'express';
import DbService from './services/db.mjs';
import config from "../config.json" assert { type: "json" };
// import path from 'path';

const server = express()
const port = process.env.PORT || 5000;

server.locals.services = {
  db: new DbService()
}

// Serve the React server as static files
// server.use(express.static(path.join(__dirname, '../client/build')));

// // Define a catch-all route to serve the React server's index.html
// server.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

server.get('/', (req, res) => {
  res.send('Hello from macandwen admin apppp');
});


// Serve static HTML files from the 'public' directory with the ".html" extension
// server.use(express.static('public', { extensions: ['html'] }));

import locationsRoutes from './routes/locations.mjs';
server.use('/api/locations', locationsRoutes);

// server.get('/list', async (req, res) => {
//   if (db) {
//     const count = await db.collection("locations").countDocuments({})
//     res.send(count + ' docs in lcoations collection')
//   }
//   res.send('cant access db')
// })

server.listen(port, async () => {
  await server.locals.services.db.connect(config.db.name)
  console.log(`macandwen admin app listening on port ${port}`)
})

// Close the MongoDB connection when the Node.js process exits
process.on('exit', () => {
  console.log('Closing MongoDB connection');
  server.locals.services.db.close()
});