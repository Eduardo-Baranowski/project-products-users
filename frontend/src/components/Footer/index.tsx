import { Button } from 'rsuite';

export function Footer() {
  return (
    <footer className="flex w-full flex-col flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <div color="blue-gray" className="font-normal mt-3">
        Copyright &copy; 2023 Sistema Gerencial Txai 5.0. Todos os direitos reservados
      </div>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Button appearance="subtle" style={{ textDecoration: 'underline' }}>
            About Us
          </Button>
        </li>
        <li>
          <Button appearance="subtle" style={{ textDecoration: 'underline' }}>
            License
          </Button>
        </li>
      </ul>
    </footer>
  );
}
