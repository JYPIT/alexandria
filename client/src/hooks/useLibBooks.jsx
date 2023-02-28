import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import LibraryService from '../service/LibraryService';

const baseURL = process.env.REACT_APP_BASE_URL;
const libraryService = new LibraryService(baseURL);

export default function useLibBooks() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const getBooksFromLib = useQuery(['library', uid || ''], async () => await libraryService.getLibraryItems(uid), { enabled: !!uid });

  const addBookToLib = useMutation((book) => libraryService.postLibraryItem(uid, book), {
    onSuccess: () => queryClient.invalidateQueries(['library']),
  });

  const removeBookFromLib = useMutation((bookId) => libraryService.deleteLibraryItem(uid, bookId), {
    // 로그인한 사용자의 캐시만 무효화
    onSuccess: () => queryClient.invalidateQueries(['library']),
  });

  return { getBooksFromLib, addBookToLib, removeBookFromLib };
}

//Firebase의 Realtime DB를 Library 구성
// uid가 false면 쿼리가 행해지지 않는다.
//   const getBooksFromLib = useQuery(['library', uid || ''], () => getBooksFromLibrary(uid), { enabled: !!uid });

//   const addBookToLib = useMutation(
//     ({ user, book }) => {
//       addBookToLibrary(user, {
//         itemId: book.itemId,
//         title: book.title,
//         author: book.author,
//         cover: book.cover,
//       });
//     },
//     {
//       onSuccess: () => queryClient.invalidateQueries(['library'], uid),
//     }
//   );

//   const removeBookFromLib = useMutation(
//     //
//     (book) => {
//       delBookFromLibrary(uid, book);
//     },
//     {
//       onSuccess: () =>
//         // 로그인한 사용자의 캐시만 무효화
//         queryClient.invalidateQueries(['library', uid]),
//     }
//   );
