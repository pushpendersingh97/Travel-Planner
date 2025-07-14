import axios from 'axios';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  try {
    const response = await axios.get('https://places-api.foursquare.com/places/search', {
      headers: {
        Authorization: `Bearer ${process.env.FOURSQUARE_API_KEY}`,
        'X-Places-Api-Version': '2025-06-17',
      },
      params: {
        query: 'tourist attractions',
        near: city,
        limit: 10,
      },
    });

    return Response.json(response.data);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch Foursquare data', details: error.message }), {
      status: 500,
    });
  }
}
