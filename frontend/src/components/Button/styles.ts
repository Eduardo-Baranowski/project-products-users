import { styled } from 'styled-components';

export const Container = styled.button`
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #000;
  width: 100%;
  font-weight: bold;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: '#0098';
  }
`;
