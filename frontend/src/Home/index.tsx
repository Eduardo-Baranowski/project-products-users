import React, { useEffect, useState } from 'react';
import { Table, Pagination, Button } from 'rsuite';
import api from '../services/api';
import PlusIcon from '@rsuite/icons/Plus';
import { TrashIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import { formatDate, money } from '../utils';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
const { Column, HeaderCell, Cell } = Table;

type IProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  qty: number;
  userId: number;
  createdAt: Date;
};

const Home: React.FC = () => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = products.filter((v, i: number) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  useEffect(() => {
    atualizar();
  }, []);

  return (
    <>
      <Header />
      <div>
        <div
          className="mt-0 w-80 flex justify-center align-center border-b border-blue-gray-50 border-b-8"
          style={{ borderColor: '#2c7474' }}
        >
          <text style={{ fontSize: 24, fontWeight: 'bold' }}>Controle de Estoque</text>
        </div>
        <div className="mt-10 mb-3">
          <Button
            style={{ backgroundColor: '#2c7474', color: '#fff' }}
            startIcon={<PlusIcon color="#fff" />}
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
              <Button
                appearance="primary"
                style={{ background: 'none', color: 'inherit', border: 'none', outline: 'inherit' }}
              >
                <Cog6ToothIcon aria-hidden="true" className="h-5 w-5 text-black-300" />
              </Button>
              <Button
                appearance="primary"
                style={{ background: 'none', color: 'inherit', border: 'none', outline: 'inherit' }}
              >
                <TrashIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
              </Button>
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
      <Footer />
    </>
  );
};

export default Home;
