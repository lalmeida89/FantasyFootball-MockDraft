import styled, { css } from 'styled-components';

export const PlayerSelector = styled.div`
  padding: 20px 5px 0 8px;
  height: 30px;
  border: 3px solid #2d2e2f;
  border-radius: 5px;
  cursor: pointer;
  line-height: 10px;

  ${props =>
    props.position ==='RB' &&
    css`
    background-color: #33614291;
      &:hover {
        background-color: #0e9c3b17;
      }
  `};

  ${props =>
    props.position ==='WR' &&
    css`
    background-color: #3a478891;
      &:hover {
        background-color: #0e269c29;
      }
  `};

  ${props =>
    props.position ==='QB' &&
    css`
    background-color: #a9a64f85;
      &:hover {
        background-color: #9c980e2e;
      }
  `};

  ${props =>
    props.position ==='TE' &&
    css`
    background-color: #98313191;
      &:hover {
        background-color: #9c0e0e40;
      }
  `};

  ${props =>
    props.position ==='K' &&
    css`
    background-color: #63458c8c;
      &:hover {
        background-color: #580bbf9c;
      }
  `};

  ${props =>
    props.position ==='DEF' &&
    css`
    background-color: #6162637a;
      &:hover {
        background-color: #8283849c;
      }
  `};
`;
