import axios from 'axios';

// Hardcoded FDA Drug Label API base URL
const BASE_URL = 'https://api.fda.gov/drug/label.json';

// Simple function to search medicines using Axios
export const searchMedicines = async (query) => {
  if (!query || query.trim() === '') return [];

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        search: `openfda.brand_name:"${query}" OR openfda.generic_name:"${query}"`,
        limit: 10
      }
    });

    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching medicine data:", error);
    return [];
  }
};
