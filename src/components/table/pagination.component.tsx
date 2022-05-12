import React from 'react';
import { useAppContext } from '../../context/app-context';

const PaginationTableComponent = () => {
  const { pages, setPage, currentPage } = useAppContext();

  if (!pages || pages === 1) return null;

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        {Array.from({ length: pages }).map((_, idx) => (
          <li
            key={idx}
            className={`page-item${currentPage === idx + 1 ? ' active' : ''}`}
            onClick={() => setPage(idx + 1)}
          >
            <button className='page-link'>{idx + 1}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationTableComponent;
