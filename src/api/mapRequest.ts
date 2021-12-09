import request from './request';

const getChinaWeatherDate = () => {
  return request({
    url: '/china.xml',
    method: 'get',
  });
};
export default getChinaWeatherDate;
