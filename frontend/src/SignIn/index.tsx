import React from 'react';
import { Container, ContainerForm, ContainerTxai, HelperText } from './styles';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import logoImg from '../assets/logo-txai.svg';

const schema = yup.object().shape({
  cpf: yup.string().required('Por  favor, digite o CPF do usuário!'),
  password: yup.string().required('Por  favor, digite a senha do usuário!'),
});

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { signIn } = useAuth();

  const onSubmitHandler = handleSubmit(async (data: any) => {
    try {
      await signIn({
        cpf: data.cpf,
        password: data.password,
      });
      window.location.pathname = '/home';
      reset();
      toast.success('Login realizado com sucesso');
    } catch (error) {
      toast.error('Não foi possível realizar o login');
    }
  });

  return (
    <Container>
      <ContainerTxai>
        <div>
          <div>
            <div className="flex justify-end items-end">
              <h2 className="flex mb-5 text-center font-semibold leading-10 text-white">
                Bem-Vindo
              </h2>
            </div>
            <img alt="" src={logoImg} />
          </div>
          <div className="mt-16 flex items-center justify-start gap-x-6">
            <button
              onClick={onSubmitHandler}
              type="submit"
              style={{
                backgroundColor: '#569090',
                width: 330,
              }}
              className="rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible  :outline-indigo-600"
            >
              Entrar
            </button>
          </div>
        </div>
      </ContainerTxai>
      <ContainerForm>
        <form onSubmit={onSubmitHandler}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Login</h2>

            <div className="col-span-full">
              <label htmlFor="cpf" className="block text-sm font-medium leading-6 text-gray-900">
                CPF
              </label>
              <div className="mt-2">
                <input
                  {...register('cpf', { required: true })}
                  id="cpf"
                  name="cpf"
                  type="text"
                  autoComplete="cpf"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.cpf?.message && <HelperText type="error">{errors.cpf?.message}</HelperText>}
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
                  {...register('password', { required: true })}
                  id="password"
                  name="password"
                  type="text"
                  autoComplete="password"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password?.message && (
                  <HelperText type="error">{errors.password?.message}</HelperText>
                )}
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
        </form>
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
              <button
                onSubmit={() => {}}
                style={{ color: '#2c7474' }}
                className="font-medium text-gray-900"
                onClick={() => {
                  window.location.pathname = '/signup';
                }}
              >
                cadastre-se agora
              </button>
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
      </ContainerForm>
      <ToastContainer autoClose={4000} position="top-right" theme="colored" closeOnClick />
    </Container>
  );
};

export default SignIn;
