export function getBestseller() {
  return fetch('data/bestseller.json')
    .then((res) => res.json())
    .then((data) => data.item);
}

export function getNew() {
  return fetch('data/new.json')
    .then((res) => res.json())
    .then((data) => data.item);
}

export function getBlogBest() {
  return fetch('data/blogBest.json')
    .then((res) => res.json())
    .then((data) => data.item);
}
