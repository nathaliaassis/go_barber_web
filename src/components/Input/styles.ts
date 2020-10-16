import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 0 16px;
  width: 100%;

  color: #666360;

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
