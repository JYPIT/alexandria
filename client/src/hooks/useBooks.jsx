import { useQuery } from '@tanstack/react-query';
import { getBestseller, getBlogBest, getNew } from '../api/bookAPI';

export default function useBooks() {
  const bestsellerQuery = useQuery(['bestseller'], getBestseller);
  const newBookQuery = useQuery(['new'], getNew);
  const blogbestQuery = useQuery(['blogBest'], getBlogBest);

  return { bestsellerQuery, newBookQuery, blogbestQuery };
}
