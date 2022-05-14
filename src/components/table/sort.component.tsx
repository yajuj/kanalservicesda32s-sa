import React from 'react';
import { useAppContext } from '../../context/app-context';

const SortComponent = () => {
  const { sortBy, setSortBy } = useAppContext();
  return (
    <div className='text-end my-2'>
      <div className='border border-secondary rounded d-inline p-1'>
        <span>Сортировка&nbsp;</span>
        <select className='border-0' onChange={setSortBy} value={sortBy}>
          <option value=''>отсутствует</option>
          <option value='date'>по Дате</option>
          <option value='title'>по Названию</option>
          <option value='quantity'>по Количеству</option>
          <option value='distance'>по Расстоянию</option>
        </select>
      </div>
    </div>
  );
};

export default SortComponent;
