
export default async function handler(req, res) {
  const { slug } = req.query;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/services/${slug}`); // Replace with your Laravel API endpoint
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
