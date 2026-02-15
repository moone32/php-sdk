import axios from 'axios';

const codef = axios.create({
  baseURL: import.meta.env.VITE_CODEF_BASE_URL || 'https://api.codef.io',
  timeout: 10000,
});

export async function fetchAuctionItemsFromCodef() {
  const payload = {
    organization: '0004',
    pageNo: 1,
    itemCount: 50,
  };

  const response = await codef.post('/v1/kr/public/auction/property-list', payload, {
    headers: {
      'Content-Type': 'application/json',
      'X-CLIENT-ID': import.meta.env.VITE_CODEF_CLIENT_ID,
      'X-CLIENT-SECRET': import.meta.env.VITE_CODEF_CLIENT_SECRET,
      'X-PUBLIC-KEY': import.meta.env.VITE_CODEF_PUBLIC_KEY,
    },
  });

  return response.data?.data?.resAuctionList || [];
}
