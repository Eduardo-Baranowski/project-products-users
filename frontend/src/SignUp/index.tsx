import React, { useState } from 'react';
import { Container, ContainerForm, ContainerLogo, HelperText } from './styles';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import api from '../services/api';
import { Button } from 'rsuite';
import PlusIcon from '@rsuite/icons/ArowBack';
import CamIcon from '@rsuite/icons/Image';
import logoImg from '../assets/logo-txai-2.svg';

const schema = yup.object().shape({
  cpf: yup.string().required('Por  favor, digite o CPF do usuário!'),
  password: yup.string().required('Por  favor, digite a senha do usuário!'),
  passwordConfirm: yup.string().required('Por  favor, digite a confirmação da senha!'),
  name: yup.string().required('Por  favor, digite o nome completo!'),
  username: yup.string().required('Por  favor, digite o nome de usuário!'),
  email: yup.string().required('E-mail required').email('Enter a valid email address'),
});

const SignUp: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState('');
  const [role, setRole] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(role);

  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      setImage(URL.createObjectURL(evt.target.files[0]));
      setFile(evt.target.files[0]);
    }
  };

  const onSubmitHandler = handleSubmit(async (data: any) => {
    try {
      if (data.password === data.passwordConfirm) {
        await api
          .post('/user/create', {
            cpf: data.cpf,
            password: data.password,
            name: data.name,
            username: data.username,
            email: data.email,
            role: role,
          })
          .then(async item => {
            const dataForm: any = new FormData();

            dataForm.append('file', file);

            await api.post(`/user/uploadImage/${item.data.id}`, dataForm, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            setImage('');
          });

        reset();
      } else {
        toast.error('Senhas não conferem!');
      }
      toast.success('Usuário criado com sucesso');
    } catch (error) {
      toast.error('Não foi possível criar o usuário');
    }
  });

  return (
    <Container>
      <ContainerForm>
        <form onSubmit={onSubmitHandler}>
          <ContainerLogo>
            <img alt="" src={logoImg} className="pr-10" />
          </ContainerLogo>
          <div className="pb-12">
            <h2 className="mt-10">Faça seu cadastro</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">*Campos obrigatórios</p>

            <div className="col-span-full mt-5">
              <div className="mt-2 flex items-center gap-x-3">
                {image ? (
                  <img src={image} className="h-14 w-14 rounded-full" />
                ) : (
                  <div className="h-14 w-14 rounded-full" style={{ backgroundColor: '#2988ef' }} />
                )}

                <div className="col-span-full absolute ml-8 mt-4">
                  <div className="text-center">
                    <div className="mt-6 flex text-sm text-gray-600">
                      <label
                        htmlFor="file"
                        className="relative cursor-pointer rounded-full pr-1 pl-1 justify-center, items-center bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <CamIcon style={{ width: 10, height: 10 }}>Upload a file</CamIcon>
                        <input
                          id="file"
                          onChange={e => {
                            handleImageUpload(e);
                          }}
                          name="file"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="ml-2 text-[#2c7474]">Carregar foto</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  *Nome Completo
                </label>
                <div className="mt-2">
                  <input
                    {...register('name', { required: true })}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="given-name"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.name?.message && (
                    <HelperText type="error">{errors.name?.message}</HelperText>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="cpf" className="block text-sm font-medium leading-6 text-gray-900">
                  *CPF
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
                  {errors.cpf?.message && (
                    <HelperText type="error">{errors.cpf?.message}</HelperText>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    {...register('email', { required: true })}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email?.message && (
                    <HelperText type="error">{errors.email?.message}</HelperText>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  *Nome de usuário
                </label>
                <div className="mt-2">
                  <input
                    {...register('username', { required: true })}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.username?.message && (
                    <HelperText type="error">{errors.username?.message}</HelperText>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  *Senha
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

              <div className="sm:col-span-4">
                <label
                  htmlFor="passwordConfirm"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  *Confirmar senha
                </label>
                <div className="mt-2">
                  <input
                    {...register('passwordConfirm', { required: true })}
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="text"
                    autoComplete="password"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.passwordConfirm?.message && (
                    <HelperText type="error">{errors.passwordConfirm?.message}</HelperText>
                  )}
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                  *Cargo
                </label>
                <div className="mt-2">
                  <select
                    id="role"
                    name="role"
                    autoComplete=""
                    onChange={e => setRole(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>common</option>
                    <option>development</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              style={{ backgroundColor: '#fff', color: '#8d9494' }}
              startIcon={<PlusIcon color="#8d9494 " />}
              onClick={() => {
                window.location.pathname = '/';
              }}
            >
              Voltar ao Login
            </Button>
            <button
              style={{ backgroundColor: '#2c7474' }}
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Concluir cadastro
            </button>
          </div>
        </form>
      </ContainerForm>
      <ToastContainer autoClose={4000} position="top-right" theme="colored" closeOnClick />
    </Container>
  );
};

export default SignUp;
