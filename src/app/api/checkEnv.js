// pages/api/checkEnv.js

export default function handler(req, res) {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  res.status(200).json({ DB_HOST, DB_USER, DB_PASSWORD, DB_NAME });
}
