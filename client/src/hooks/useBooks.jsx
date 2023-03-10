import { useQuery } from '@tanstack/react-query';
import { getBestseller, getBlogBest, getNew } from '../api/bookAPI';

export default function useBooks() {
  const bestsellerQuery = useQuery(['bestseller'], () => getBestseller().then((res) => res.data.item));
  const newBookQuery = useQuery(['new'], () => getNew().then((res) => res.data.item));
  const blogbestQuery = useQuery(['blogBest'], () => getBlogBest().then((res) => res.data.item));

  return { bestsellerQuery, newBookQuery, blogbestQuery };
}
