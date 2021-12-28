import axios from 'axios';

const request = axios.create({
  //http://flash.weather.com.cn/wmaps/xml/china.xml
  baseURL: 'wearherApi',
  timeout: 5000,
});

const myRequest = axios.create({
  //http://flash.weather.com.cn/wmaps/xml/china.xml
  baseURL: 'myApi',
  timeout: 5000,
});

export { request, myRequest };
