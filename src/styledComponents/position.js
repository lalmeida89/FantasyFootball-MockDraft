import styled, { css } from 'styled-components';

export const Position = styled.span`
  border-radius: 50%;
  background-color: white;
  padding: 2px 5px;
  margin-right: 4px;

  ${props =>
    props.position == 'RB' &&
    css`
    color: #0e9c3b
  `};

  ${props =>
    props.position == 'WR' &&
    css`
    color: #0e269cd1
  `};

  ${props =>
    props.position == 'QB' &&
    css`
    color: #9c980e;
  `};

  ${props =>
    props.position == 'TE' &&
    css`
    color: #960e0ede;
  `};

  ${props =>
    props.position == 'K' &&
    css`
    color: #580bbfeb;
  `};

  ${props =>
    props.position == 'DEF' &&
    css`
    color: #828384f2;
  `};
`;
