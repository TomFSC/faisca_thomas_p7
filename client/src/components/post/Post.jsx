import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "../../utils/date/localeDate";
import axios from "axios";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

//Styled-components
const PostContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  row-gap: 15px;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  width: 500px;
  min-height: 180px;
  margin: 0 auto 50px;
  padding: 15px;
  background-color: ${colors.secondary};
  border-radius: 15% 15%;
  box-shadow: 5px 5px 20px ${colors.primary};
  overflow: hidden;
`;

const PostImgContainer = styled.div`
  display: flex;
  max-width: 90%;
  height: 300px;
  margin-top: 15px;
  overflow: hidden;
  border-radius: 35px;
`;

const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostMessageContainer = styled.div`
  display: flex;
  width: 90%;
  height: 40%;
  padding: 5px 15px;
  border-radius: 12px;
  background-color: white;
  border: 2px solid ${colors.tertiary};
  color: ${colors.tertiary};
  font-size: 18px;
`;

const PostText = styled.p`
  display: flex;
  width: 90%;
  margin-left: 50px;
  justify-self: flex-start;
  font-style: italic;
  font-weight: 500;
  font-size: 18px;
  text-shadow: 3px 2px 10px ${colors.tertiary};
  color: ${colors.tertiary};
`;

const PostInfosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin-bottom: 15px;
  color: ${colors.tertiary};
  font-size: 18px;
`;

const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100px;
  margin-left: 50px;
`;

const LikePost = styled(ThumbUpIcon)`
  display: flex;
  scale: 1.2;
  margin-right: 15px;

  &:hover {
    cursor: pointer;
    color: ${colors.primary};
  }
`;

const PostOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100px;
  margin-right: 25px;
`;

const ModifyPost = styled(EditIcon)`
  color: ${colors.tertiary};
  scale: 1.2;
  &:hover {
    cursor: pointer;
    color: ${colors.primary};
  }
`;

const DeletePost = styled(DeleteIcon)`
  color: ${colors.tertiary};
  scale: 1.2;
  &:hover {
    cursor: pointer;
    color: ${colors.primary};
  }
`;

const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10px;
  z-index: 999;
  align-items: center;
  justify-content: space-around;
  width: 300px;
  height: 150px;
  padding: 15px;
  font-size: large;
  color: ${colors.tertiary};
  border: 2px solid ${colors.tertiary};
  background-color: ${colors.secondary};
  border-radius: 50px;
`;

const ValidButton = styled.button`
  height: 30px;
  width: 30%;
  margin: 25px auto 0 auto;
  color: ${colors.tertiary};
  border: 0;
  border-radius: 25px;
  box-shadow: ${colors.tertiary} 2px 2px 5px;
  font-size: 14px;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 18px;
  margin: 0 25px;
`;

//Function
const Post = ({ post, setPost }) => {
  //Use user context
  const { user } = useContext(AuthContext);
  //Navigation
  const navigate = useNavigate();
  //States
  const [confirmBox, setConfirmBox] = useState(false);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //Cancel delete
  const cancelDelete = () => {
    setConfirmBox(false);
  };

  //Delete a Posts
  const deletePost = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/posts/${post._id}`,

        {
          headers: {
            Authorization: user.token,
          },
        }
      );

      setConfirmBox(false);
      // window.location.reload();
      setPost();
      setErrorMsg("");
    } catch (error) {
      setErrorMsg("Vous n'êtes pas autorisé à supprimé ce post !");
    }
  };

  //Like a post
  useEffect(() => {
    setIsLiked(post.likes.includes(user.currentUser.userId));
  }, [post.likes, user]);

  const handleLike = () => {
    axios.put(
      `${process.env.REACT_APP_API_URL}/api/posts/${post._id}/like`,
      user.currentUser,
      {
        headers: {
          authorization: user.token,
        },
      }
    );
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <>
      <PostContainer key={post.postId}>
        {confirmBox && (
          <ConfirmContainer>
            {!errorMsg ? (
              <>
                {" "}
                Voulez-vous supprimer ce Post ?
                <ValidButton onClick={() => deletePost(post._id)}>
                  OK
                </ValidButton>
              </>
            ) : (
              <ErrorMsg>{errorMsg}</ErrorMsg>
            )}
            <ValidButton onClick={cancelDelete}>ANNULER</ValidButton>
          </ConfirmContainer>
        )}
        <PostText>
          Publié il y a {moment(`${post.updatedAt}`).locale("fr").fromNow(true)}{" "}
          par {post.username}
        </PostText>
        {post.image && (
          <PostImgContainer key="postImage">
            <PostImg src={post.image} alt="image from post" />
          </PostImgContainer>
        )}

        <PostMessageContainer key="postMessage">
          {post.message}
        </PostMessageContainer>

        <PostInfosContainer key="postInfos">
          <LikesContainer>
            <LikePost color={isLiked ? "success" : ""} onClick={handleLike} />
            {like}
            <PostText style={{ marginLeft: "5px" }}>
              {like <= 1 ? "Like" : "Likes"}
            </PostText>
          </LikesContainer>
          {(post.userId === user.currentUser.userId ||
            user.currentUser.isAdmin) && (
            <PostOptions>
              <ModifyPost
                onClick={() => {
                  navigate(`/post/${post._id}`);
                }}
              />
              <DeletePost
                onClick={() => {
                  setConfirmBox(true);
                }}
              />
            </PostOptions>
          )}
        </PostInfosContainer>
      </PostContainer>
    </>
  );
};

export default Post;
