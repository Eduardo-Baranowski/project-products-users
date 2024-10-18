import React, { useEffect, useState } from 'react';
import { Table, Pagination, Button } from 'rsuite';
import api from '../services/api';
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import { TrashIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import { formatDate, money } from '../utils';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import Modal from '../components/Modal';
const { Column, HeaderCell, Cell } = Table;
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ButtonSteper, ContainerForm, ContainerSteeper, DivNumber, HelperText } from './styles';
import { toast, ToastContainer } from 'react-toastify';
import ModalDelete from '../components/ModalDelete';

type IProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  qty: number;
  userId: number;
  createdAt: Date;
};

const schema = yup.object().shape({
  name: yup.string().required('Por  favor, digite o nome do produto!'),
  price: yup.string().required('Por  favor, digite o valor do produto!'),
  // qty: yup.string().required('Por  favor, digite a quantidade!'),
  createdAt: yup.string().required('Por  favor, forneça a data de cadastro!'),
});

const Home: React.FC = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [createdAt, setCreatedAt] = useState<Date>();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disbledForm, setDisabledForm] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const atualizar = async () => {
    let complete = false;
    api
      .get(`/product/list`)
      .then(res => {
        setProducts(res.data);
      })
      .finally(() => {
        setLoading(false);
        if (complete) {
          setLoading(false);
        } else {
          complete = true;
        }
      });
  };

  const handleDelete = async (idProduct: number) => {
    try {
      await api.delete(`/product/${idProduct}`);
      setOpenDelete(false);
      atualizar();
      toast.success('Produto excluído com sucesso');
    } catch (error: any) {
      if (error.response.data.message === 'propuct does not belongs to user!.') {
        toast.error('Produto não pertence ao usuário');
      } else {
        toast.error('Não foi possível remover o produto');
      }
    }
  };

  function handleDisabledSubmit() {
    return null;
  }

  const onSubmitHandler = handleSubmit(async (data: any) => {
    try {
      if (disbledForm === false) {
        if (id > 0) {
          const selectedDate = new Date(data.createdAt);
          selectedDate.setDate(selectedDate.getDate() + 1);

          await api.patch(`/product/${id}`, {
            name: data.name,
            description: data.name,
            price: Number(data.price),
            qty: qty,
            createdAt: selectedDate,
          });
          reset({
            createdAt: undefined,
          });
          reset();
          setOpen(false);
          atualizar();
          toast.success('Produto atualizado com sucesso');
        } else {
          await api.post('/product/create', {
            name: data.name,
            description: data.name,
            price: Number(data.price),
            qty: qty,
            createdAt: data.createdAt,
          });
          reset({
            createdAt: undefined,
          });
          reset();
          setOpen(false);
          atualizar();
          toast.success('Produto criado com sucesso');
        }
      }
      setDisabledForm(false);
    } catch (error) {
      toast.error('Não foi possível cadastrar o produto');
    }
  });

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = products.filter((v, i: number) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  function handleMinus() {
    const qtyNew = qty - 1;
    setQty(qtyNew);
  }

  function handlePlus() {
    const qtyNew = qty + 1;
    setQty(qtyNew);
  }

  useEffect(() => {
    atualizar();
  }, [id]);

  return (
    <>
      <Header />
      <div>
        <div
          className="mt-0 w-80 flex justify-center align-center border-blue-gray-50 border-b-8"
          style={{ borderColor: '#2c7474' }}
        >
          <h3 style={{ fontSize: 24, fontWeight: 'bold' }}>Controle de Estoque</h3>
        </div>
        <div className="mt-10 mb-3">
          <Button
            style={{ backgroundColor: '#2c7474', color: '#fff' }}
            startIcon={<PlusIcon color="#fff" />}
            onClick={() => {
              setId(0);
              setName('');
              setPrice(0);
              setCreatedAt(new Date());
              setQty(1);
              setOpen(true);
              reset();
            }}
          >
            Cadastrar Produto
          </Button>
        </div>
        <div style={{ padding: 20, marginLeft: 70, marginRight: 70 }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            total={products.length}
            limitOptions={[10, 30, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
        <Table
          height={500}
          data={data}
          loading={loading}
          style={{ marginLeft: 70, marginRight: 70 }}
        >
          <Column width={140} fixed>
            <HeaderCell>Data de cadastro</HeaderCell>
            <Cell>{(rowData: IProductProps) => <>{formatDate(rowData.createdAt)}</>}</Cell>
          </Column>

          <Column width={150}>
            <HeaderCell>Nome</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column width={120}>
            <HeaderCell>Preço</HeaderCell>
            <Cell>{(rowData: IProductProps) => <text>{money(String(rowData.price))}</text>}</Cell>
          </Column>

          <Column width={120}>
            <HeaderCell>Quantidade</HeaderCell>
            <Cell dataKey="qty" />
          </Column>
          <Column width={200} flexGrow={1}>
            <HeaderCell>Valor Total</HeaderCell>
            <Cell>
              {(rowData: IProductProps) => <>{money(String(rowData.price * rowData.qty))}</>}
            </Cell>
          </Column>
          <Column>
            <HeaderCell> </HeaderCell>
            <Cell dataKey="email" style={{ flexDirection: 'row', display: 'flex' }}>
              {(rowData: IProductProps) => (
                <>
                  <Button
                    appearance="primary"
                    style={{
                      background: 'none',
                      color: 'inherit',
                      border: 'none',
                      outline: 'inherit',
                    }}
                    onClick={() => {
                      setId(Number(rowData.id));
                      setName(rowData.name);
                      setPrice(rowData.price);
                      setCreatedAt(
                        new Date(
                          new Date(rowData.createdAt).getFullYear(),
                          new Date(rowData.createdAt).getMonth(),
                          new Date(rowData.createdAt).getDate(),
                        ),
                      );
                      setQty(Number(rowData.qty));
                      setOpen(true);
                    }}
                  >
                    <Cog6ToothIcon aria-hidden="true" className="h-5 w-5 text-black-300" />
                  </Button>
                  <Button
                    appearance="primary"
                    style={{
                      background: 'none',
                      color: 'inherit',
                      border: 'none',
                      outline: 'inherit',
                    }}
                    onClick={() => {
                      setId(Number(rowData.id));
                      setOpenDelete(true);
                    }}
                  >
                    <TrashIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
                  </Button>
                </>
              )}
            </Cell>
          </Column>
        </Table>
        <div style={{ padding: 20, marginLeft: 70, marginRight: 70 }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            total={products.length}
            limitOptions={[10, 30, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      </div>
      <Modal
        id={id}
        open={open}
        titleButton={id > 0 ? 'Atualizar' : 'Cadastrar'}
        title={id > 0 ? 'Gerenciar produto' : 'Cadastrar novo produto'}
        onClose={() => setOpen(false)}
        onPress={onSubmitHandler}
      >
        <ContainerForm>
          <form onSubmit={onSubmitHandler} className="mr-4 ml-4 flex">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div className="col-span-full">
                <label
                  htmlFor="createdAt"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Data de Cadastro
                </label>
                <div className="mt-2">
                  <input
                    {...register('createdAt', { required: true })}
                    id="createdAt"
                    name="createdAt"
                    value={String(createdAt?.toLocaleDateString('en-CA'))}
                    onChange={e => {
                      const selectedDate = new Date(e.target.value);
                      selectedDate.setDate(selectedDate.getDate() + 1);
                      setCreatedAt(selectedDate);
                    }}
                    type="date"
                    className="block px-2 w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.createdAt?.message && (
                    <HelperText type="error">{errors.createdAt?.message}</HelperText>
                  )}
                </div>
              </div>

              <div className="flex flex-row col-span-full">
                <div className="col-span-full mr-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nome
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('name', { required: true })}
                      id="name"
                      name="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      type="text"
                      className="block px-2 w-72   rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.name?.message && (
                      <HelperText type="error">{errors.name?.message}</HelperText>
                    )}
                  </div>
                </div>

                <div className="col-span-full" onSubmit={() => handleDisabledSubmit()}>
                  <label
                    htmlFor="qty"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    onSubmit={() => handleDisabledSubmit()}
                  >
                    Quantidade
                  </label>
                  <div
                    className="block mt-2 px-2 w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#2c7474] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="qty"
                    onSubmit={() => handleDisabledSubmit()}
                  >
                    <ContainerSteeper onSubmit={() => handleDisabledSubmit()}>
                      <ButtonSteper onSubmit={() => handleDisabledSubmit()}>
                        <MinusIcon
                          color="#2c7474"
                          onSubmit={() => handleDisabledSubmit()}
                          onClick={() => {
                            if (qty > 1) {
                              setDisabledForm(true);
                              handleMinus();
                            }
                          }}
                        />
                      </ButtonSteper>
                      <DivNumber onSubmit={() => handleDisabledSubmit()}>{qty}</DivNumber>
                      <ButtonSteper onSubmit={() => handleDisabledSubmit()}>
                        <PlusIcon
                          color="#2c7474"
                          onSubmit={() => handleDisabledSubmit()}
                          onClick={() => {
                            setDisabledForm(true);
                            handlePlus();
                          }}
                        />
                      </ButtonSteper>
                    </ContainerSteeper>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Valor R$
                </label>
                <div className="mt-2">
                  <input
                    {...register('price', { required: true })}
                    id="price"
                    name="price"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    type="text"
                    className="block px-2  w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.price?.message && (
                    <HelperText type="error">{errors.price?.message}</HelperText>
                  )}
                </div>
              </div>
            </div>
          </form>
        </ContainerForm>
      </Modal>

      <ModalDelete
        id={id}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onPress={() => {
          handleDelete(id);
        }}
      />
      <ToastContainer autoClose={4000} position="top-right" theme="colored" closeOnClick />

      <Footer />
    </>
  );
};

export default Home;
