import styled from "styled-components";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
// import RightBar from "../../components/rightbar/RightBar";

const HomeContainer = styled.div`
  display: flex;
`;

export default function Home() {
  return (
    <>
      <TopBar />
      <HomeContainer>
        <Feed />
        {/* <RightBar /> */}
      </HomeContainer>
    </>
  );
}
