import { useLocation } from 'react-router';

export default function BookDetail() {
  const location = useLocation();
  const book = location.state.book;
  const { cover, title, author, isbn13, bestRank, publisher, description } = book;

  return (
    <div>
      <img src={cover} alt="이미지 없음" />
      <div>
        <span>{title}</span>
        <span>{author}</span>
        <span>{publisher}</span>
        <span>{isbn13}</span>
        <p>{description}</p>
      </div>
    </div>
  );
}
