import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { adminService } from '..';

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
  const [banners, setBanners] = useState();
  //   useEffect(() => {
  //     setBanner('http://localhost:8080/assets/1678273097597.jpg');
  //   }, []);

  useEffect(() => {
    adminService.getBanners().then((res) => setBanners(res));
  }, []);

  return (
    <Wrapper>
      <CoverImg //
        src={banners && '/api/assets/' + banners[0]}
        alt=""
      />
    </Wrapper>
  );
}
