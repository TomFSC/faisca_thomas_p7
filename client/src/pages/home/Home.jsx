import styled from "styled-components";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";

//Styled component
const HomeContainer = styled.div`
  display: flex;
`;

//Function
export default function Home() {
  return (
    <>
      <TopBar />
      <HomeContainer>
        <Feed />
      </HomeContainer>
    </>
  );
}
