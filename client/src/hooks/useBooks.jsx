import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBestseller, getBlogBest, getNew } from '../api/bookAPI';
import { addBookToLibrary } from '../api/firebase';

export default function useBooks() {
  const queryClient = useQueryClient();

  const bestsellerQuery = useQuery(['bestseller'], getBestseller);
  const newBookQuery = useQuery(['new'], getNew);
  const blogbestQuery = useQuery(['blogBest'], getBlogBest);

  const addBook = useMutation(
    ({ user, book }) => {
      addBookToLibrary(user, {
        id: book.itemId,
        title: book.title,
        author: book.author,
        cover: book.cover,
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['books']),
    }
  );

  return { bestsellerQuery, newBookQuery, blogbestQuery, addBook };
}
