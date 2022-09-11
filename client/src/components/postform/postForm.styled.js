import styled from "styled-components";
import colors from "../../utils/style/colors";
import CancelIcon from "@mui/icons-material/Cancel";

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
