import React, { useRef, useContext } from "react";
import { loginCall } from "../../context/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../utils/images/logo.png";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/colors";

//Styled Component
const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const PrimaryTitle = styled.h2`
  font-size: 35px;
  margin: 0 auto 20px;
  color: ${colors.tertiary};
  text-shadow: 0 10px 10px ${colors.tertiary};
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  min-width: 350px;
  max-width: 600px;
  row-gap: 25px;
  padding: 25px;
  background-color: ${colors.secondary};
  border-radius: 25% 10%;
  box-shadow: 10px 10px 30px ${colors.primary};
`;

const Title = styled.h2`
  margin: 0 auto;
  color: ${colors.tertiary};
  text-shadow: 0 10px 10px ${colors.tertiary};
`;
const Infos = styled.h4`
  color: ${colors.tertiary};
  width: 80%;
  margin: 20px auto;
`;

// const ErrorMsg = styled.p`
//   color: red;
//   font-size: 18px;
//   margin: 0 auto;
// `;

const Label = styled.label`
  color: ${colors.tertiary};
  font-size: 20px;
  font-style: italic;
  text-shadow: 8px 8px 8px ${colors.tertiary};
`;

const Input = styled.input`
  height: 25px;
  border: solid 1px ${colors.tertiary};
  border-radius: 12px;
  ::placeholder {
    text-align: center;
    opacity: 0.7;
  }
  &:focus {
    outline: none;
    border: 2px solid ${colors.primary};
  }
`;
const Button = styled.button`
  height: 50px;
  width: 40%;
  margin: 25px auto 0 auto;
  background-color: ${colors.tertiary};
  color: ${colors.primary};
  border: 0;
  border-radius: 25px;
  box-shadow: ${colors.tertiary} 2px 2px 5px;
  font-size: large;
  &:hover {
    font-weight: bolder;
    box-shadow: ${colors.tertiary} 5px 5px 10px;
  }
`;

const RegisterLink = styled(Link)`
  color: ${colors.primary};
  text-decoration: none;
`;

function Login() {
  const email = useRef();
  const password = useRef();

  const { isFetching, dispatch } = useContext(AuthContext);

  //Submit Login Form
  const handleLogin = (event) => {
    event.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <LoginContainer>
      <LogoContainer>
        <img src={logo} alt="logo_groupomania" />
        <PrimaryTitle>Network Application</PrimaryTitle>
      </LogoContainer>
      <FormContainer onSubmit={handleLogin}>
        <Title>SE CONNECTER</Title>
        <Label>E-mail : </Label>
        <Input
          type="email"
          required
          placeholder="m.dupont@groupomania.fr"
          ref={email}
        />
        <Label>Mot de passe : </Label>
        <Input
          type="password"
          required
          placeholder="Votre mot de passe"
          ref={password}
        />
        <Button disabled={isFetching}>
          {isFetching ? <CircularProgress /> : "Connection"}
        </Button>
        <Infos>
          Vous n'avez pas encore de compte ? Enregistrez-vous{" "}
          <RegisterLink to="/register">ICI</RegisterLink>.
        </Infos>
      </FormContainer>
    </LoginContainer>
  );
}

export default Login;
