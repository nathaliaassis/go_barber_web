import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  background: #ff9000;
  height: 56px;
  border: 0;
  border-radius: 10px;
  padding: 0 16px;
  width: 100%;
  margin: 24px 0;
  transition: all 0.4s;

  font-weight: 500;
  color: #312e38;

  &:hover {
    background: ${darken(0.05, '#FF9000')};
  }
`;
