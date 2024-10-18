import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const ContainerTxai = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #2e7171;
`;

export const ContainerForm = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

type ErrorProps = {
  type: string;
};

export const HelperText = styled.p<ErrorProps>`
  font-family: Inter;
  font-size: 1rem;
  font-weight: bold;
  color: ${({ type }) => (type === 'error' ? '#FF0000' : 'green')};
`;
