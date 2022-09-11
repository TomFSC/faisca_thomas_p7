import axios from "axios";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import PostForm from "../postform/PostForm";
import Post from "../post/Post";
import colors from "../../utils/style/colors";
import { AuthContext } from "../../context/AuthContext";

const FeedContainer = styled.div`
  flex: 5.5;
`;

const FeedWrapper = styled.div`
  padding: 20px;
`;

const AddPost = styled.h2`
  text-align: center;
  margin-top: 25px;
  font-style: italic;
  font-size: 30px;
  color: ${colors.tertiary};
  text-shadow: 5px 5px 15px ${colors.tertiary};
`;

export default function Feed() {
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
  }, [user.token]);
  return (
    <FeedContainer>
      <AddPost>Ajouter un Post :</AddPost>

      <PostForm />
      <FeedWrapper>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </FeedWrapper>
    </FeedContainer>
  );
}
