import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const KEY = '28059098-e25ae0e870c106014b23bb5b1';

export async function getImages(query, page) {
  const BASE_SEARH_PARAMS = {
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page,
    q: query,
  };

  const response = await axios.get(API_URL, {
    params: BASE_SEARH_PARAMS,
  });

  return response.data;
}
