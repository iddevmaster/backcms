import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://oasapi.iddriver.com',
  // ตั้งค่า baseURL ให้เป็น URL ของเซิร์ฟเวอร์ API ที่ต้องการเชื่อมต่อ
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
    // ตั้งค่า headers ตามที่ API ระบุ (ตัวอย่างเป็น JSON)
  }
});


const apiUpload = axios.create({
  baseURL: 'https://oasapi.iddriver.com',
  // ตั้งค่า baseURL ให้เป็น URL ของเซิร์ฟเวอร์ API ที่ต้องการเชื่อมต่อ
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
    // ตั้งค่า headers ตามที่ API ระบุ (ตัวอย่างเป็น JSON)
  }
});


const ViewImage = 'https://oasapi.iddriver.com/media_file/file/?f=';

export default {
  get(resource) {
    return apiClient.get(resource);
  },
  post(resource, data) {
    return apiClient.post(resource, data);
  },
  upload(resource, data) {
    return apiUpload.post(resource, data);
  },
  put(resource, data) {
    return apiClient.put(resource, data);
  },
  delete(resource) {
    return apiClient.delete(resource);
  },
  image(img) {
    const imag = ViewImage+img;
    if(!img){
      console.log('ไม่มีรูป');
    }
    return imag;
  },
};