import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 6rem 3rem 3rem 3rem;
`;

const BannerChange = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
  input {
    cursor: pointer;
  }
  button {
    height: 1.5rem;
    width: 4rem;
    background-color: lightblue;
    cursor: pointer;
    opacity: 0.7;
    :hover {
      opacity: 1;
    }
  }
`;
const BannerTitle = styled.span`
  font-size: 24px;
`;
const Preview = styled.img`
  width: 648px;
  height: 272px;
`;

export default function AdminPage({ adminService }) {
  const [preview, setPreview] = useState();

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      //FileRead를 성공한다면 onload 함수 실행
      reader.onload = () => {
        setPreview(reader.result);
        //resolve를 실행하여 완료(이행)
        resolve();
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    adminService.writeBannerImg(file).then((res) => alert(res.data.msg));
  };
  return (
    <Container>
      <BannerChange>
        <BannerTitle>배너 변경하기</BannerTitle>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleInputFile} />
          <button>변경하기</button>
        </form>
        <span>미리보기</span>
        <Preview src={preview} alt="" />
      </BannerChange>
    </Container>
  );
}
