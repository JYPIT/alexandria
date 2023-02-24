import { memo, useState } from 'react';
import styled from 'styled-components';
import { timeFormat } from '../utils/time';
import CommentEditForm from './CommentEditForm';
import { BsThreeDotsVertical, BsPencil, BsTrash } from 'react-icons/bs';

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-right: 0.5rem;
`;
const CommentInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Username = styled.span`
  margin-right: 0.5rem;
  font-weight: 400;
`;
const Info = styled.div``;
const CreatedAt = styled.span`
  font-size: 13px;
`;
const Buttons = styled.div``;
const BtnModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 7rem;
  height: 7rem;
  background-color: lightgray;
  top: 2rem;
  right: 0;
  border-radius: 1rem;
`;
const ModalBtn = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const EditBtn = styled.button`
  height: 2rem;
  cursor: pointer;
  background-color: transparent;
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const DelBtn = styled.button`
  height: 2rem;
  cursor: pointer;
  background-color: transparent;
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const CommentList = styled.p`
  height: auto;
  white-space: pre-line;
`;

const CommentBox = memo(({ bookId, comment, setComments, handleDeleteComment, handleUpdateComment }) => {
  const [editing, setEditing] = useState(false);
  const { id: commentId, username, text, createdAt } = comment;
  const [clickedModal, setClickedModal] = useState(false);
  return (
    <Container>
      <CommentInfoBox>
        <Info>
          <Username>{username}</Username>
          <CreatedAt>{timeFormat(createdAt)}</CreatedAt>
        </Info>
        <Buttons>
          <ModalBtn onClick={() => setClickedModal((prev) => !prev)}>
            <BsThreeDotsVertical />
          </ModalBtn>
          {clickedModal ? (
            <BtnModal>
              <EditBtn onClick={() => setEditing((prev) => !prev)}>
                {editing ? '수정 취소 ' : '수정 '}
                <BsPencil />
              </EditBtn>
              <DelBtn onClick={() => handleDeleteComment(commentId)}>
                삭제 <BsTrash />
              </DelBtn>
            </BtnModal>
          ) : null}
        </Buttons>
      </CommentInfoBox>
      {editing ? ( //
        <CommentEditForm
          bookId={bookId}
          commentId={commentId}
          prevText={text}
          setEditing={setEditing}
          setComments={setComments}
          handleUpdateComment={handleUpdateComment}
        />
      ) : (
        <CommentList>{comment.text}</CommentList>
      )}
    </Container>
  );
});

export default CommentBox;
