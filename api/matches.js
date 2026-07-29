import { getFixturesByDate } from './_lib/apiFootball.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const today = new Date().toISOString().split('T')[0];

  try {
    const data = await getFixturesByDate(today);
    res.status(200).json(data);
  } catch (error) {
    res.status(502).json({ response: [] });
  }
}
