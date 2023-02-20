import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 20rem;
  margin-bottom: 1rem;
`;
const CoverImg = styled.img`
  width: 100%;
  height: 100%;
`;
export default function Banner() {
  return (
    <Wrapper>
      <CoverImg
        src="https://images.unsplash.com/photo-1590412701565-55de7fad7cab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        alt=""
      />
    </Wrapper>
  );
}
