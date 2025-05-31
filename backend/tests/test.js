import axios from 'axios';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchRepeatedly() {
  while (true) {
    try {
      const response = await axios.get('http://localhost:3000/test');
      console.log('Gelen veri:', response.data);
    } catch (error) {
      console.error('Hata oluştu:', error);
    }
    await sleep(1);
  }
}

fetchRepeatedly();
