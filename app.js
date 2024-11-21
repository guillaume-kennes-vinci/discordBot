import 'dotenv/config';
import express from 'express';
import { combinedMiddleware } from './combinedMiddleware.js';
import { discordClient } from './BOT/youtube_feed.js';
import { moderationClient } from './BOT/moderation.js';
import ngrok from 'ngrok';

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Use the combined middleware
app.use(combinedMiddleware);
app.use(express.json()); // Ensure the request body is parsed after signature verification

// Start the Express server
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  try {
    const url = await ngrok.connect({
      addr: PORT,
      authtoken: process.env.NGROK_AUTH_TOKEN,
    });
    console.log(`Ngrok tunnel started at ${url}`);
  } catch (err) {
    console.error('Error starting Ngrok:', err);
  }
});