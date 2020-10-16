import styled from 'styled-components';
import { darken, shade } from 'polished';

import backgroundSignIn from '../../assets/sign-in-background.png';

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

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;

      color: #f4ede8;

      &::placeholder {
        color: #666360;
      }

      & + input {
        /** todo input que tiver abaixo de outro */
        margin-top: 8px;
      }
    }

    button {
      background: #ff9000;
      height: 56px;
      border: 0;
      border-radius: 10px;
      padding: 0 16px;
      width: 100%;
      margin: 24px 0;
      transition: all 0.4s;

      font-weight: 500;
      color: #321e38;

      &:hover {
        background: ${darken(0.05, '#FF9000')};
      }
    }

    a {
      display: block;
      margin-top: 24px;
      transition: color 0.4s;
      text-decoration: none;
      color: #f4ede8;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    /** só vai estilizar o a que vir diretamente dentro do content e nao outro nivel */
    display: flex;
    align-items: center;

    margin-top: 24px;
    transition: color 0.4s;

    color: #ff9000;
    text-decoration: none;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${darken(0.1, '#FF9000')};
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${backgroundSignIn}) no-repeat center;
  background-size: cover;
`;
