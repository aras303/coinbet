export default async function handler(req, res) {

  const today = new Date().toISOString().split("T")[0];

  const response = await fetch(
    `https://v3.football.api-sports.io/fixtures?date=${today}`,
    {
      headers: {
        "x-apisports-key": "dfd781a849a72523f6bcaa1ffc7c967a"
      }
    }
  );

  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}