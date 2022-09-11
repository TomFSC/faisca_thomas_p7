import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

export const FormWrapper = styled.div`
  padding: 10px;
`;

export const PostFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 400px;
  min-width: 250px;
  margin: 20px auto 50px;
  padding: 30px;
  background-color: ${colors.secondary};
  border-radius: 20% 20%;
  box-shadow: 10px 10px 30px ${colors.primary};
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  column-gap: 15px;
  color: ${colors.tertiary};
  font-size: 20px;
  font-style: italic;
  text-shadow: 8px 8px 8px ${colors.tertiary};
`;

export const FileInput = styled.input`
  display: none;
`;

export const PostFormImgContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 150px;
  padding: 0 20px 10px 20px;
  margin: 0 auto;
  position: relative;
`;

export const PostFileImg = styled.img`
  border-radius: 10%;
  width: 150px;
  object-fit: cover;
`;

export const CancelImg = styled(CancelIcon)`
  color: ${colors.tertiary};
  position: absolute;
  top: 5px;
  right: 25px;
  cursor: pointer;
  opacity: 0.7;
`;

export const StyledHr = styled.hr`
  margin: 0 20px;
`;

export const TextArea = styled.textarea`
  display: flex;
  flex-wrap: wrap;
  align-self: center;
  width: 100%;
  padding: 5px;
  border: solid 2px ${colors.tertiary};
  border-radius: 10px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  height: 35px;
  width: 25%;
  margin: 25px auto 0 auto;
  background-color: ${colors.tertiary};
  color: ${colors.primary};
  border: 0;
  border-radius: 25px;
  box-shadow: ${colors.tertiary} 2px 2px 5px;
  font-size: large;
`;

export default function PostForm() {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userId = user.currentUser.userId;
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("image", file);
    formData.append("message", message);

    await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, formData, {
      headers: { Authorization: currentUser.token },
    });
    setMessage("");
    setFile(null);
  };

  return (
    <FormWrapper>
      <PostFormContainer onSubmit={handleFormSubmit}>
        {file && (
          <PostFormImgContainer>
            <PostFileImg src={URL.createObjectURL(file)} alt="post_img" />
            <CancelImg onClick={() => setFile(null)} />
          </PostFormImgContainer>
        )}
        <StyledHr />
        <Label htmlFor="file">
          Ajouter une image :
          <PermMediaIcon htmlColor={`${colors.primary}`} />
          <FileInput
            type="file"
            id="file"
            accept=".png,.jpeg,jpg"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Label>
        <Label htmlFor="">Message :</Label>
        <TextArea
          name="message"
          value={message}
          required
          placeholder=">Ecrivez votre message ici"
          onChange={(e) => setMessage(e.target.value)}
        ></TextArea>
        <Button>PUBLIER</Button>
      </PostFormContainer>
    </FormWrapper>
  );
}
