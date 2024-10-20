import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f8f8f8;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ContainerLogo = styled.div`
  display: flex;
  margin-left: -5px;
`;

export const ContainerTxai = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  flex-direction: row;
  background-color: #f8f8f8;
`;

export const ContainerForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type ErrorProps = {
  type: string;
};

export const HelperText = styled.p<ErrorProps>`
  font-family: Inter;
  font-size: 14px;
  color: ${({ type }) => (type === 'error' ? '#FF0000' : 'green')};
`;
