import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { delBookFromLibrary, getBooksFromLibrary } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import { addBookToLibrary } from '../api/firebase';

export default function useLibBooks() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  // uid가 false면 쿼리가 행해지지 않는다.
  const getBooksFromLib = useQuery(['library', uid || ''], () => getBooksFromLibrary(uid), { enabled: !!uid });

  const addBookToLib = useMutation(
    ({ user, book }) => {
      addBookToLibrary(user, {
        itemId: book.itemId,
        title: book.title,
        author: book.author,
        cover: book.cover,
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['library'], uid),
    }
  );

  const removeBookFromLib = useMutation(
    //
    (book) => {
      delBookFromLibrary(uid, book);
    },
    {
      onSuccess: () =>
        // 로그인한 사용자의 캐시만 무효화
        queryClient.invalidateQueries(['library', uid]),
    }
  );

  return { getBooksFromLib, addBookToLib, removeBookFromLib };
}
