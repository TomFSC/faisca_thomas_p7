import styled from "styled-components";
import colors from "../../utils/style/colors";
import defaultPicture from "../../utils/images/noAvatar.png";

const RightBarContainer = styled.div`
  width: 200px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 250px;
  margin: 30px auto 20px;
  padding: 5px;
  box-shadow: 5px 5px 8px ${colors.tertiary};
  background-color: ${colors.secondary};
  border-radius: 15%;
`;

const PictureContainer = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export default function Rightbar() {
  return (
    <RightBarContainer>
      <UserInfoContainer>
        <PictureContainer src={defaultPicture} alt="profilPicture" />
      </UserInfoContainer>
    </RightBarContainer>
  );
}
