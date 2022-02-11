import { myRequest } from './request';

interface item {
  date: string;
  address: string;
  nickname: string;
  comment: string;
}
const postNewItem = (data: item) => {
  return myRequest({
    url: '/comment',
    method: 'POST',
    data: data,
  });
};

const getItems = () => {
  return myRequest({
    url: '/comment',
    method: 'GET',
  });
};

export { postNewItem, getItems };
