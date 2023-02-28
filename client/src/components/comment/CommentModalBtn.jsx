import styled from 'styled-components';
import { BsThreeDotsVertical, BsPencil, BsTrash } from 'react-icons/bs';
const Buttons = styled.div`
  position: relative;
`;
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
  z-index: 10;
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
export default function CommentModalBtn({ commentId, clickedModal, setClickedModal, editing, setEditing, handleDeleteComment }) {
  return (
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
  );
}
