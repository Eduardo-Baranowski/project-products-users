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
  font-size: 14px;
  color: ${({ type }) => (type === 'error' ? '#FF0000' : 'green')};
`;

export const ContainerSteeper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-right: 5px;
  padding-left: 5px;
  flex-direction: row;
`;

export const DivNumber = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-left: 10px;
  justify-content: center;
`;

export const ButtonSteper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;
