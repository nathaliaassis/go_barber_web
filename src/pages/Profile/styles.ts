import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  > header {
    height: 144px;
    background-color: #28262e;

    display: flex;
    align-items: center;

    div {
      max-width: 1120px;
      margin: 0 auto;
      width: 100%;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center; /*horizontal e vertical no centro*/
  align-items: center;
  margin: -150px auto 0;

  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      text-align: left;
      font-size: 20px;
      margin-bottom: 24px;
    }
  }
`;

export const AvatarInput = styled.div`
    position: relative;
    margin-bottom: 32px;
    align-self: center;
  img {
    height: 186px;
    width: 186px;
    border-radius: 50%;
  }

  label{
    position: absolute;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    border: 0;
    background-color: #FF9000;
    right: 0;
    bottom: 0;
    transition: all .2s;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    input {
      display: none;
    }

    svg {
      height: 20px;
      width: 20px;
      color: #312E38;
    }

    &:hover {
      background: ${shade(0.2, '#FF9000')};
    }
  }
`;
