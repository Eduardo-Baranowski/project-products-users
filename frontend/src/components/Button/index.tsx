import { Container } from './styles';

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Button = ({ children, ...rest }: Props) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
