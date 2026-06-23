export default async function handler(req, res) {

  const response = await fetch(
  "https://api.football-data.org/v4/matches",
  {
    headers: {
      "X-Auth-Token": "5abad29ba46d4c0082d41217d74e913d"
    }
  }
);

  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}