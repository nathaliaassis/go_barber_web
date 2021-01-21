import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type?: 'success' | 'error' | 'info';
  hasDescription: number;
}
function toastColor(type: any) {
  switch (type) {
    case 'success':
      return '#2e656a';
    case 'error':
      return '#c53030';
    case 'info':
      return '#3172b7';
    default:
      return null;
  }
}

function toastBgColor(type: any) {
  switch (type) {
    case 'success':
      return '#e6fffa';
    case 'error':
      return '#fddede';
    default:
      return '#ebf8ff';
  }
}

export const Container = styled(animated.div) <ToastProps>`
  position: relative;
  display: flex;
  padding: 16px 30px 16px 16px;
  width: 360px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  background-color: ${props => toastBgColor(props.type)};
  color: ${props => toastColor(props.type)};

  > svg {
    margin: 4px 12px 0 0;
  }

  div{
    flex: 1;
  }

  p{
    margin-top: 4px;
    opacity: 0.8;

    font-size: 14px;
    line-height: 20px;
  }

  button {
    position: absolute;
    right: 16px;
    top: 16px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  & + div {
    margin-top: 8px;
  }

  ${props => !props.hasDescription && css`
    align-items: center;

    svg{
      margin-top: 0;
    }
  `}
`;
