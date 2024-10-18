import { styled } from 'styled-components';

export const ContainerForm = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
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
