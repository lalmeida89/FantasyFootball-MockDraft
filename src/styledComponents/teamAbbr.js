import styled, { css } from 'styled-components';

export const TeamAbbr = styled.span`
  border-radius: 4px;
  padding: 2px 5px;
  margin-right: 4px;
  text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
  color: white;

  ${props =>
    props.team === 'PIT' &&
    css`
    background: linear-gradient(to right, rgba(1,5,13,1) 0%, rgba(1,5,13,1) 49%, rgba(166,166,18,1) 51%, rgba(166,166,18,1) 100%);
  `};

  ${props =>
    props.team === 'CLE' &&
    css`
    background: linear-gradient(to right, rgba(13,3,2,1) 0%, rgba(13,3,2,1) 49%, rgba(245,121,12,1) 51%, rgba(245,121,12,1) 100%);
  `};

  ${props =>
    props.team === 'LV' &&
    css`
    background: linear-gradient(to right, rgba(13,3,2,1) 0%, rgba(13,3,2,1) 49%, rgba(158,156,155,1) 51%, rgba(158,156,155,1) 100%);
  `};

  ${props =>
    props.team === 'CIN' &&
    css`
    background: linear-gradient(to right, rgba(13,3,2,1) 0%, rgba(13,3,2,1) 49%, rgba(255,92,10,1) 51%, rgba(255,92,10,1) 100%);
  `};

  ${props =>
    (props.team === 'NE' || props.team === 'NYG' || props.team === 'HOU' || props.team === 'BUF') &&
    css`
    background: linear-gradient(to right, rgba(25,69,179,1) 0%, rgba(25,69,179,1) 49%, rgba(168,36,36,1) 51%, rgba(168,36,36,1) 100%);
  `};

  ${props =>
    props.team === 'LAC' &&
    css`
    background: linear-gradient(to right, rgba(25,69,179,1) 0%, rgba(25,69,179,1) 49%, rgba(177,184,35,1) 51%, rgba(177,184,35,1) 100%);
  `};

  ${props =>
    props.team === 'NYJ' &&
    css`
    background: linear-gradient(to right, rgba(8,128,8,1) 0%, rgba(8,128,8,1) 49%, rgba(161,161,159,1) 51%, rgba(161,161,159,1) 100%);
  `};

  ${props =>
    props.team === 'WAS' &&
    css`
    background: linear-gradient(to right, rgba(128,9,9,1) 0%, rgba(128,9,9,1) 50%, rgba(179,167,30,1) 51%, rgba(179,167,30,1) 100%);
  `};

  ${props =>
    props.team === 'DAL' &&
    css`
    background: linear-gradient(to right, rgba(10,63,128,1) 0%, rgba(10,63,128,1) 50%, rgba(173,172,166,1) 51%, rgba(173,172,166,1) 100%);
  `};

  ${props =>
    props.team === 'SEA' &&
    css`
    background: linear-gradient(to right, rgba(52,98,153,1) 0%, rgba(52,98,153,1) 50%, rgba(55,179,55,1) 51%, rgba(55,179,55,1) 100%);
  `};

  ${props =>
    props.team === 'LAR' &&
    css`
    background: linear-gradient(to right, rgba(11,83,138,1) 0%, rgba(11,83,138,1) 50%, rgba(158,158,15,1) 51%, rgba(158,158,15,1) 100%);
  `};

  ${props =>
    props.team === 'PHI' &&
    css`
    background: linear-gradient(to right, rgba(11,87,4,1) 0%, rgba(11,87,4,1) 50%, rgba(173,172,166,1) 51%, rgba(173,172,166,1) 100%);
  `};

  ${props =>
    props.team === 'GB' &&
    css`
    background: linear-gradient(to right, rgba(11,138,30,1) 0%, rgba(11,138,30,1) 50%, rgba(199,199,26,1) 51%, rgba(199,199,26,1) 100%);
  `};

  ${props =>
    props.team === 'CAR' &&
    css`
    background: linear-gradient(to right, rgba(11,68,138,1) 0%, rgba(11,68,138,1) 50%, rgba(23,23,4,1) 51%, rgba(23,23,4,1) 100%);
  `};

  ${props =>
    (props.team === 'DET' || props.team === 'IND') &&
    css`
    background: linear-gradient(to right, rgba(11,68,138,1) 0%, rgba(11,68,138,1) 50%, rgba(112,112,106,1) 51%, rgba(112,112,106,1) 100%);
  `};

  ${props =>
    props.team === 'NO' &&
    css`
    background: linear-gradient(to left, rgba(153,153,52,1) 0%, rgba(153,153,52,1) 50%, rgba(18,18,2,1) 51%, rgba(18,18,2,1) 100%);
  `};


  ${props =>
    props.team === 'MIA' &&
    css`
    background: linear-gradient(to right, rgba(21,140,59,1) 0%, rgba(21,140,59,1) 50%, rgba(222,134,40,1) 51%, rgba(222,134,40,1) 100%);
  `};

  ${props =>
    props.team === 'SF' &&
    css`
    background: linear-gradient(to right, rgba(138,44,21,1) 0%, rgba(138,44,21,1) 50%, rgba(140,126,58,1) 51%, rgba(140,126,58,1) 100%);
  `};

  ${props =>
    props.team === 'TEN' &&
    css`
    background: linear-gradient(to right, rgba(17,25,115,1) 0%, rgba(17,25,115,1) 50%, rgba(22,90,122,1) 51%, rgba(22,90,122,1) 100%);
  `};

  ${props =>
    (props.team === 'TB' || props.team ==='ARI') &&
    css`
    background: linear-gradient(to right, rgba(184,33,27,1) 0%, rgba(184,33,27,1) 50%, rgba(8,24,31,1) 51%, rgba(8,24,31,1) 100%);
  `};

  ${props =>
    props.team === 'ATL' &&
    css`
    background: linear-gradient(to right, rgba(143,37,33,1) 0%, rgba(143,37,33,1) 50%, rgba(8,24,31,1) 51%, rgba(8,24,31,1) 100%);
  `};

  ${props =>
    props.team === 'JAC' &&
    css`
    background: linear-gradient(to right, rgba(13,23,87,1) 0%, rgba(13,23,87,1) 50%, rgba(1,82,27,1) 51%, rgba(1,82,27,1) 100%);
  `};

  ${props =>
    props.team === 'DEN' &&
    css`
    background: linear-gradient(to right, rgba(20,68,110,1) 0%, rgba(20,68,110,1) 50%, rgba(191,81,31,1) 51%, rgba(191,81,31,1) 100%);
  `};

  ${props =>
    props.team === 'BAL' &&
    css`
    background: linear-gradient(to right, rgba(68,13,186,1) 0%, rgba(68,13,186,1) 50%, rgba(10,4,2,1) 51%, rgba(10,4,2,1) 100%);
  `};

  ${props =>
    props.team === 'MIN' &&
    css`
    background: linear-gradient(to right, rgba(79,52,153,1) 0%, rgba(79,52,153,1) 50%, rgba(206,219,20,1) 51%, rgba(206,219,20,1) 100%);
  `};

  ${props =>
    props.team === 'CHI' &&
    css`
    background: linear-gradient(to right, rgba(29,66,122,1) 0%, rgba(29,66,122,1) 50%, rgba(189,107,19,1) 51%, rgba(189,107,19,1) 100%);
  `};

  ${props =>
    props.team === 'KC' &&
    css`
    background: linear-gradient(to right, rgba(219,40,40,1) 0%, rgba(219,40,40,1) 50%, rgba(219,203,24,1) 51%, rgba(219,203,24,1) 100%);
  `};

  ${props =>
    !props.team &&
    css`
    background-color: gray;
  `};
`;
