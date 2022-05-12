import React from 'react';
import { useAppContext } from '../../context/app-context';

const SortComponent = () => {
  const { sortBy, setSortBy } = useAppContext();
  return (
    <div className='text-end my-2'>
      <select onChange={setSortBy} value={sortBy}>
        <option disabled value=''>
          Сортировка
        </option>
        <option value='date'>По Дате</option>
        <option value='title'>По Названию</option>
        <option value='quantity'>По Количеству</option>
        <option value='distance'>По Расстоянию</option>
      </select>
    </div>
  );
};

export default SortComponent;
