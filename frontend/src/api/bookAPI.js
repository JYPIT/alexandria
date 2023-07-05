import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function getBestseller() {
  return await axios({
    url: `${BASE_URL}/books/best`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getNew() {
  return await axios({
    url: `${BASE_URL}/books/new`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getBlogBest() {
  return await axios({
    url: `${BASE_URL}/books/blog`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
// export function getBestseller() {
//   return fetch('data/bestseller.json')
//     .then((res) => res.json())
//     .then((data) => data.item);
// }

// export function getNew() {
//   return fetch('data/new.json')
//     .then((res) => res.json())
//     .then((data) => data.item);
// }

// export function getBlogBest() {
//   return fetch('data/blogBest.json')
//     .then((res) => res.json())
//     .then((data) => data.item);
// }
