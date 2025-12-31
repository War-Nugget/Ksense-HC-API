import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.DEMO_MED_API_KEY;
if (!apiKey) throw new Error("Missing DEMO_MED_API_KEY");
