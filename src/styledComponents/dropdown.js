import styled, { css } from 'styled-components';

export const Button = styled.button`
  border: 2px solid #34423a;
  padding: 2px;
  width: 100%;
  text-align: justify;
  cursor: pointer;
  display: block;

  ${props =>
    props.dropBtn &&
    css`
      &:hover {
        background-color: #b7b7b77a;
      }
  `};
`;
