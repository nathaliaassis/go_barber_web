import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span{
    visibility: hidden;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    width: 160px;

    font-size: 14px;
    font-weight: 500;
    color: #312e38;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    opacity:0;
    transition: all .5s;


    &::before{
      position: absolute;
      border-style: solid;
      border-width: 6px 6px 0 6px;
      border-color: #ff9000 transparent;
      content: '';
      top: 100%;
      left: 52%;
      transform: translateX(-50%);
    }
  }

  &:hover{
    span{
      opacity: 1;
      visibility: visible;
    }
  }
`;
