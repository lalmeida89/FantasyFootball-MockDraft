import styled, { css } from 'styled-components';

export const ProfileButton = styled.button`
  padding: 5px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  margin-right: 5px;
  border-radius: 5px;
  background-color: #0e269c9c;
  color: white;
  &:hover {
    box-shadow: 1px 1px 14px -1px rgba(0,0,0,0.75);
    background-color: #0e269c6e;
  }

  ${props =>
    props.draft &&
    css`
    float: right;
    padding: 5px 10px;
  `}
`;
