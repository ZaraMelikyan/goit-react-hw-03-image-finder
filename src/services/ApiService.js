import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '28059098-e25ae0e870c106014b23bb5b1';

export async function getImages(query, page) {
  const url = `${API_URL}?key=${API_KEY}`;

  try {
    const API_SEARCH_PARAMS = {
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page,
      q: query,
    };

    const response = await axios.get(url, {
      params: API_SEARCH_PARAMS,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
