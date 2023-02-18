import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToLib, delBookFromLibrary, getBooksFromLibrary } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useLibBooks() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  // uid가 false면 쿼리가 행해지지 않는다.
  const getBooksFromLib = useQuery(['library', uid || ''], () => getBooksFromLibrary(uid), { enabled: !!uid });

  const removeBookFromLib = useMutation((book) => delBookFromLibrary(uid, book), {
    onSuccess: () => {
      // 로그인한 사용자의 캐시만 무효화
      queryClient.invalidateQueries(['library', uid]);
    },
  });
  return { getBooksFromLib, removeBookFromLib };
}