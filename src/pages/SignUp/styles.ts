import styled from 'styled-components';
import { darken, shade } from 'polished';

import backgroundSignUp from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center; /*horizontal e vertical no centro*/
  align-items: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }

  a {
    display: flex;
    align-items: center;

    margin-top: 24px;
    transition: color 0.4s;
    text-decoration: none;
    color: #f4ede8;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${backgroundSignUp}) no-repeat center;
  background-size: cover;
`;
