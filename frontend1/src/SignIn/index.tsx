import React from 'react';
import { Container, ContainerForm, ContainerTxai } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <ContainerTxai></ContainerTxai>
      <ContainerForm>
        <form>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Login</h2>

            <div className="col-span-full">
              <label htmlFor="cpf" className="block text-sm font-medium leading-6 text-gray-900">
                CPF
              </label>
              <div className="mt-2">
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  autoComplete="cpf"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Senha
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="text"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="justify-between flex-row flex col-span-full">
              <div className="flex">
                <div className="relative flex gap-x-3 mr-5">
                  <div className="text-sm leading-6 flex-col mr-20">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 mr-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="text-sm leading-6">
                        <label htmlFor="comments" className="font-medium text-gray-900">
                          Lembrar minha senha
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="text-sm leading-6">
                  <label htmlFor="comments" className="font-medium text-gray-900">
                    Esqueci minha senha
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-6 justify-center">
            <div className="relative flex gap-x-3 mr-5">
              <div className="text-sm leading-6">
                <label htmlFor="comments" className="font-medium text-gray-900">
                  Não tem uma conta?
                </label>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="text-sm leading-6">
                <label htmlFor="comments" className="font-medium text-gray-900">
                  cadastre-se agora
                </label>
              </div>
            </div>
          </div>

          <div className="flex mt-20 justify-center">
            <div className="relative flex gap-x-3 mr-1">
              <div className="text-sm leading-6">
                <label htmlFor="comments" className="font-medium text-gray-900">
                  Ajuda &#8226;
                </label>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="text-sm leading-6">
                <label htmlFor="comments" className="font-medium text-gray-900">
                  Política de privacidade
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </ContainerForm>
    </Container>
  );
};

export default SignIn;
