interface ApiConfig {
  BASE_URL: string;
}

const getBaseUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:10000';
  }
  
  // Remove any trailing slashes and ensure proper URL formatting
  const apiUrl = import.meta.env.VITE_API_URL || 'http://161.35.137.136:10000';
  return apiUrl.replace(/\/+$/, ''); // Remove trailing slashes if present
};

export const API_CONFIG: ApiConfig = {
  BASE_URL: getBaseUrl()
};