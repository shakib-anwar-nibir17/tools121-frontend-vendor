import { GetVendorToken } from "./GetToken";

const { BASE_URL } = require("@/constant/urls");

export const generateFile = async (filePath) => {
    try {
      console.log('img api called -------------->>>>>', filePath);
  
      const response = await fetch(`${BASE_URL}/generate-file/?file_path=${filePath}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${GetVendorToken()}`,  // Include the token here
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('img api data -------------->>>>>', data);
  
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  