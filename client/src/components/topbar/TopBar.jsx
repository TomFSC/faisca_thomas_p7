import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import groupomaniaLogo from "../../utils/images/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";

const TopBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  top: 0;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  z-index: 999;
  background-color: white;
  border-bottom: 3px solid ${colors.tertiary};
  box-shadow: 8px 8px 15px ${colors.tertiary};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  max-height: 100%;
  max-width: 250px;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const LinksContainer = styled.div`
  display: flex;
  height: 100%;
  width: 250px;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
`;

const PagesLink = styled(Link)`
  font-weight: bold;
  color: ${colors.tertiary};
  padding-bottom: 15px;
  margin-bottom: -15px;
  &:hover {
    border-bottom: 2px solid ${colors.tertiary};
  }
`;

const LogoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 100px;
  margin-right: 20px;
`;

const Logout = styled(LogoutIcon)`
  color: ${colors.tertiary};
  scale: 1.4;
  &:hover {
    cursor: pointer;
    color: ${colors.primary};
  }
`;

export default function TopBar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("user", null);
    window.location.reload();
  };

  return (
    <TopBarContainer>
      <LogoContainer>
        <Logo src={groupomaniaLogo} alt="groupomania_logo" />
      </LogoContainer>
      {!user ? (
        <LinksContainer>
          <PagesLink to="/login">SE CONNECTER</PagesLink>
          <PagesLink to="/register">S'ENREGISTER</PagesLink>
        </LinksContainer>
      ) : (
        <LogoutContainer>
          <Logout onClick={() => handleLogout} />
        </LogoutContainer>
      )}
    </TopBarContainer>
  );
}
