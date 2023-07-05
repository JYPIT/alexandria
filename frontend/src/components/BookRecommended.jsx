import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  background-color: rgba(0, 0, 0, 0.7);
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
const Filter = styled.button`
  text-align: center;
  font-size: 1.1rem;
  padding: 10px;
  margin: 1rem 0 2rem 0;
  color: white;
  background-color: gray;
  border-radius: 1rem;
  cursor: pointer;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;
const SelectedFilter = styled.button`
  text-align: center;
  font-size: 1.1rem;
  padding: 10px;
  margin: 1rem 0 2rem 0;
  color: black;
  background-color: ligthgray;
  border-radius: 1rem;
  cursor: pointer;
`;

const Book = styled.div`
  box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 15px 5px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 2rem;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
const Img = styled.img`
  width: 10rem;
  height: 15rem;
`;

const filters = ['비슷한 제목의 책', '작가의 다른 책'];
export default function BookRecommended({ recommendService, book }) {
  const navigate = useNavigate();
  const [isRelativeAuthor, setIsRelativeAuthor] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [recommended, setRecommended] = useState();
  useEffect(() => {
    //FIXME: 전환 딜레이 줄이기
    isRelativeAuthor
      ? recommendService.getRelativeAuthor(book).then((data) => setRecommended(data))
      : recommendService.getRelativeTitle(book).then((data) => setRecommended(data));
  }, [isRelativeAuthor, recommendService, book]);

  const handleClickBook = (book) => {
    navigate(`/books/${book.id}`, { state: { book: book } });
  };

  const handleClickFilter = (e) => {
    const index = e.target.value;
    setSelectedIdx(index);
    if (index === '0') setIsRelativeAuthor(false);
    else setIsRelativeAuthor(true);
  };

  return (
    <Container>
      <Wrapper>
        {filters.map((value, index) =>
          selectedIdx === index + '' ? (
            <SelectedFilter key={index} value={index} onClick={handleClickFilter}>
              {value}
            </SelectedFilter>
          ) : (
            <Filter key={index} value={index} onClick={handleClickFilter}>
              {value}
            </Filter>
          )
        )}
      </Wrapper>
      {recommended &&
        recommended.map((book) => (
          <Book key={book.itemId} onClick={() => handleClickBook(book)}>
            <Img src={book.cover} alt="" />
          </Book>
        ))}
    </Container>
  );
}
