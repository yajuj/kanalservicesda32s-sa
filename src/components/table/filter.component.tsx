import React, { useContext } from 'react';
import { useAppContext } from '../../context/app-context';

const FilterComponent = () => {
  const {
    query,
    setQuery,
    operator,
    setOperator,
    property,
    setProperty,
    clearFilter,
  } = useAppContext();
  return (
    <div className='card p-3 position-relative'>
      <div className='d-flex gap-2'>
        <select value={property} onChange={setProperty} className='form-select'>
          <option disabled value=''>
            Колонка
          </option>
          <option value='title'>Название</option>
          <option value='quantity'>Количество</option>
          <option value='distance'>Расстояние</option>
        </select>
        <select value={operator} onChange={setOperator} className='form-select'>
          <option disabled value='default'>
            Условие
          </option>
          <option value='equal'>равно</option>
          <option value='like'>содержит</option>
          <option value='gte'>больше</option>
          <option value='lte'>меньше</option>
        </select>
        <input
          value={query}
          onChange={setQuery}
          className='form-control'
          type='text'
          placeholder='Поиск'
        />
        {query && operator !== 'default' && property && (
          <button
            onClick={clearFilter}
            className='btn btn-danger position-absolute top-50 start-100 translate-middle-y mx-3'
          >
            Сбросить
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
