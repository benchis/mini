import {post,get} from '@/data/util/index'


export function login(data) {
  return post('login',data);
}

export function logout(data) {
  return get('/logout');
}
