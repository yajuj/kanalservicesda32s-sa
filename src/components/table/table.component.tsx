import React from 'react';
import { IItem } from '../../types/item.types';
import FilterComponent from './filter.component';
import PaginationTableComponent from './pagination.component';
import SortComponent from './sort.component';
interface TableComponentProps {
  items?: IItem[];
}

const TableComponent: React.FC<TableComponentProps> = ({ items }) => {
  if (!items?.length)
    return (
      <>
        <FilterComponent />
        <table className='table'>
          <thead>
            <tr>
              <th className='text-center' scope='col'>
                Нет Записей
              </th>
            </tr>
          </thead>
        </table>
      </>
    );

  return (
    <>
      <FilterComponent />
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Дата</th>
            <th scope='col'>Название</th>
            <th scope='col'>Количество</th>
            <th scope='col'>Расстояние</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <th scope='row'>{item.id}</th>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>{item.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SortComponent />
      <PaginationTableComponent />
    </>
  );
};

export default TableComponent;
