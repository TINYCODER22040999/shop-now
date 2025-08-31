import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// API utility functions
export const api = {
  // GET request
  get: async (url, config = {}) => {
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  },

  // POST request
  post: async (url, data = null, config = {}) => {
    try {
      // Ensure data is properly formatted
      const requestData = data ? JSON.stringify(data) : null;
      const response = await axios.post(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
          ...config.headers
        },
        ...config
      });
      return response.data;
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  },

  // PUT request
  put: async (url, data = null, config = {}) => {
    try {
      const requestData = data ? JSON.stringify(data) : null;
      const response = await axios.put(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
          ...config.headers
        },
        ...config
      });
      return response.data;
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await axios.delete(url, config);
      return response.data;
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }
};

// If you need to use XMLHttpRequest (not recommended for React)
export const createXHRRequest = (method, url, data = null) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (error) {
          resolve(xhr.responseText);
        }
      } else {
        reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
      }
    };
    
    xhr.onerror = () => {
      reject(new Error('Network error'));
    };
    
    // Properly handle the data - this prevents the requestData || null error
    if (data) {
      const requestData = JSON.stringify(data);
      xhr.send(requestData);
    } else {
      xhr.send(); // Send without data
    }
  });
};

export default api;
