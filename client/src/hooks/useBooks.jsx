import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addBookToLibrary } from '../api/firebase';

export default function useBooks() {
  const queryClient = useQueryClient();
  const getBooks = useQuery(['books'], async () => {
    return fetch('data/blogBest.json')
      .then((res) => res.json())
      .then((data) => data.item);
  });

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

  return { getBooks, addBook };
}
