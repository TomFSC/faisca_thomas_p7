import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import logo from "../../utils/images/logo.png";

//Styled Components
const RegisterContainer = styled.div`
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
  display: flex;
  width: 50%;
  color: ${colors.tertiary};
  margin: 10px 0;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 18px;
  margin: 0 auto;
`;

const Label = styled.label`
  color: ${colors.tertiary};
  font-size: 20px;
  font-style: italic;
  text-shadow: 8px 8px 8px ${colors.tertiary};
`;

const Input = styled.input`
  height: 25px;
  border: 2px solid ${colors.tertiary};
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
  margin: 10px auto 0 auto;
  background-color: ${colors.tertiary};
  color: ${colors.primary};
  border: 0;
  border-radius: 25px;
  box-shadow: ${colors.tertiary} 2px 2px 5px;
  font-size: large;
`;

//Function
function Register() {
  //Navigation
  const navigate = useNavigate();
  //States & refs
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  //Error state
  const [errorFormMsg, setErrorFormMsg] = useState("");

  //Submit Register Form
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity(
        "Les mots de passe doivent être identiques"
      );
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/register`,
          user
        );
        navigate("/login");
      } catch (error) {
        setErrorFormMsg(error.response.data);
      }
    }
  };

  return (
    <RegisterContainer>
      <LogoContainer>
        <img src={logo} alt="" />
        <PrimaryTitle>Network Application</PrimaryTitle>
      </LogoContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Title>S'ENREGITRER</Title>
        {errorFormMsg && <ErrorMsg>{errorFormMsg} </ErrorMsg>}
        <Label>Nom d'utilisateur : *</Label>
        <Input
          type="text"
          required
          placeholder="Votre nom d'utilisateur"
          ref={username}
        />
        <Label>E-mail : *</Label>
        <Input
          type="email"
          required
          placeholder="EX: m.dupond@gmail.fr"
          ref={email}
        />
        <Label>Mot de passe : *</Label>
        <Input
          type="password"
          required
          placeholder="Votre Mot de Passe"
          ref={password}
        />

        <Label>Confirmer le mot de passe : *</Label>
        <Input
          type="password"
          required
          placeholder="Confirmez votre Mot de Passe"
          ref={confirmPassword}
        />
        <Infos>* ces champs sont obligatoire</Infos>
        <Button
          type="submit"
          disabled={!username || !email || !password || !confirmPassword}
        >
          Enregistrer
        </Button>
      </FormContainer>
    </RegisterContainer>
  );
}

export default Register;
