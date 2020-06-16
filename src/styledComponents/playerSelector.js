import styled, { css } from 'styled-components';

export const PlayerSelector = styled.div`
  padding: 20px 5px 0 8px;
  height: 30px;
  border: 2px solid rgba(34,41,48,.7);
  border-radius: 5px;
  cursor: pointer;
  line-height: 10px;

  ${props =>
    props.position ==='RB' &&
    css`
    background-color: #0e9c3b9c;
      &:hover {
        background-color: #0e943966;
      }
  `};

  ${props =>
    props.position ==='WR' &&
    css`
    background-color: #0e269c9c;
      &:hover {
        background-color: #0e269c6e;
      }
  `};

  ${props =>
    props.position ==='QB' &&
    css`
    background-color: #9c980e9c;
      &:hover {
        background-color: #9c980e66;
      }
  `};

  ${props =>
    props.position ==='TE' &&
    css`
    background-color: #9c0e0e9c;
      &:hover {
        background-color: #9c0e0e5e;
      }
  `};

  ${props =>
    props.position ==='K' &&
    css`
    background-color: #580bbf9c;
      &:hover {
        background-color: #580bbf73;
      }
  `};

  ${props =>
    props.position ==='DEF' &&
    css`
    background-color: #8283849c;
      &:hover {
        background-color: #b7b7b77a;
      }
  `};
`;
