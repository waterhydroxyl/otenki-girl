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
export { postNewItem };
