import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;
export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;

  > img {  /* only first img */
    height: 80px
  }

  button {
    background: transparent;
    border: 0;
    margin-left: auto;
    transition: all .2s;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }

    &:hover {
      svg {
        color: #BCBCBC;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }
    strong {
      color: #ff9000;
    }
  }

`;
