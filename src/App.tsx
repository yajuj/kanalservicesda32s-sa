import React from 'react';
import './App.css';
import TableComponent from './components/table/table.component';
import { useAppContext } from './context/app-context';

function App() {
  const { items } = useAppContext();
  return (
    <div className='App w-50 mx-auto mt-2'>
      <TableComponent items={items} />
    </div>
  );
}

export default App;
