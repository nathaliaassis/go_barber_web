import styled from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  background: #232129;
  border-radius: 10px;
  border: 2px solid ${props => (props.isFocused ? '#FF9000' : '#232129')};
  padding: 0 16px;
  width: 100%;
  transition: all 0.4s;

  color: ${props =>
    props.isFocused || props.isFilled ? '#FF9000' : '#666360'};

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    padding: 16px 0;

    &::placeholder {
      color: #666360;
    }
  }

  & + div {
    /** todo input que tiver abaixo de outro */
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }
`;
