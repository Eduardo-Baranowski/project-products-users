import { format, parseISO } from 'date-fns';

export const formatDate = (data: any) => {
  return !data ? 'Sem data' : format(parseISO(data), 'dd/MM/yyyy');
};

export const money = (valor: string) => {
  const v = valor ? parseFloat(valor) : 0;
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
