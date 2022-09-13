import axios from "axios";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import PostForm from "../postform/PostForm";
import Post from "../post/Post";
import colors from "../../utils/style/colors";
import { AuthContext } from "../../context/AuthContext";

//Styled components
const FeedContainer = styled.div`
  flex: 5.5;
`;

const FeedWrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-top: 25px;
  font-style: italic;
  font-size: 30px;
  color: ${colors.tertiary};
  text-shadow: 5px 5px 15px ${colors.tertiary};
`;

//Function
export default function Feed() {
  //Use user context
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  //Get All Posts
  useEffect(() => {
    const getPosts = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/posts`, {
          headers: { Authorization: user.token },
        })
        .then((response) => {
          setPosts(response.data);
        });
    };
    getPosts();
  }, [posts, user.token]);
  return (
    <FeedContainer>
      <Title>Ajouter un Post :</Title>
      <PostForm />
      <Title>Dernières publications</Title>
      <FeedWrapper>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </FeedWrapper>
    </FeedContainer>
  );
}
