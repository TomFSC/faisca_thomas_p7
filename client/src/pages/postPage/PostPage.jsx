import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

import colors from "../../utils/style/colors";
import {
  FormWrapper,
  PostFormContainer,
  Label,
  FileInput,
  PostFormImgContainer,
  PostFileImg,
  CancelImg,
  StyledHr,
  TextArea,
  Button,
} from "../../components/postform/PostForm";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useNavigate, useParams } from "react-router-dom";

const Title = styled.h2`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 50px 0 50px;
  color: ${colors.tertiary};
  text-shadow: 8px 8px 20px ${colors.tertiary};
`;

const ReturnIcon = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 25px;
  font-size: 25px;
  color: ${colors.tertiary};
  margin: 25px 0 0 25px;
  &:hover {
    cursor: pointer;
    color: ${colors.primary};
  }
`;

export default function PostPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const [newFile, setNewFile] = useState("");
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/posts/${id}`,
        {
          headers: { Authorization: user.token },
        }
      );
      setPost(res.data);
      setFile(res.data.image);
      setMessage(res.data.message);
    };
    getPost();
  }, [id, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", user.currentUser.userId);
    formData.append("image", newFile);
    formData.append("message", message);

    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/posts/${id}`,
      formData,
      {
        headers: {
          Authorization: user.token,
        },
      }
    );
    navigate("/");
  };

  return (
    <FormWrapper>
      <ReturnIcon to="/">
        <BackspaceIcon style={{ scale: "2" }} />
        Retour
      </ReturnIcon>
      <Title>Modifiez votre Post :</Title>
      <PostFormContainer onSubmit={handleUpdate}>
        {newFile && (
          <PostFormImgContainer>
            <PostFileImg src={URL.createObjectURL(newFile)} alt="post_image" />
            <CancelImg
              id="cancel_new-file"
              onClick={() => {
                setNewFile(null);
              }}
            />
          </PostFormImgContainer>
        )}
        <StyledHr />

        {file && !newFile ? (
          <PostFormImgContainer>
            <PostFileImg src={file} />
            <CancelImg id="cancel_file" onClick={() => setFile(false)} />
          </PostFormImgContainer>
        ) : (
          ""
        )}
        <Label htmlFor="file">
          Modifier image :
          <PermMediaIcon htmlColor={`${colors.primary}`} />
          <FileInput
            type="file"
            id="file"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => setNewFile(e.target.files[0])}
          />
        </Label>
        <Label htmlFor="message">Modifier message :</Label>
        <TextArea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></TextArea>
        <Button>VALIDER</Button>
      </PostFormContainer>
    </FormWrapper>
  );
}
