
import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'https://dummyjson.com', // Replace with your API base URL
    // Other Axios configuration options can be added here
  });

  // const apiClient = useRuntimeConfig().public.BASE_API_URL;
export default apiClient;

