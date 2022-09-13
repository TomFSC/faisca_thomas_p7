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
  StyledHr,
  TextArea,
  Button,
} from "../../components/postform/PostForm";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useNavigate, useParams } from "react-router-dom";

//Styled components
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

//Function
export default function PostPage() {
  //Navigation
  const navigate = useNavigate();
  //Params & user context
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  //States
  const [message, setMessage] = useState("");
  const [postFile, setPostFile] = useState("");
  const [file, setFile] = useState("");
  const [post, setPost] = useState({});

  //Get a post
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/posts/${id}`,
        {
          headers: { Authorization: user.token },
        }
      );
      setPost(res.data);
      setPostFile(res.data.image);
      setMessage(res.data.message);
    };
    getPost();
  }, [id, user, post]);

  //Update post
  const handleUpdate = async (e) => {
    const newFile = file ? file : "";
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
        {file && (
          <PostFormImgContainer>
            <PostFileImg src={URL.createObjectURL(file)} alt="post_image" />
          </PostFormImgContainer>
        )}
        <StyledHr />
        {postFile ? (
          <PostFormImgContainer>
            <PostFileImg src={postFile} />
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
            onChange={(e) => setFile(e.target.files[0])}
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
