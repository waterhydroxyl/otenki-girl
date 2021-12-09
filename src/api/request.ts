import axios from 'axios';

const request = axios.create({
  //http://flash.weather.com.cn/wmaps/xml/china.xml
  baseURL: 'wearherApi',
  timeout: 5000,
});

export default request;
