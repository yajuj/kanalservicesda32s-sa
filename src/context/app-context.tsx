import React from 'react';
import { IItem } from '../types/item.types';

interface AppContexProviderProps {
  children: React.ReactNode;
}

interface ContextState {
  isLoading: boolean;
  items: IItem[];
  error: string | null;
  pages: number;
  currentPage: number;
  query: string;
  operator: Operator;
  property: keyof Omit<IItem, 'date'> | '';
  sortBy: keyof IItem | '';
  setPage: (page: number) => void;
  clearFilter: () => void;
  setQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setOperator: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setProperty: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const itemsPerPage = 10;

type Operator = 'default' | 'equal' | 'lte' | 'gte' | 'like';

const Context = React.createContext<ContextState>({} as ContextState);

const AppContexProvider: React.FC<AppContexProviderProps> = ({ children }) => {
  const [items, setItems] = React.useState<IItem[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const mergedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const pages = Math.ceil(items.length / itemsPerPage);

  const [query, setQuery] = React.useState<string>('');
  const [operator, setOperator] = React.useState<Operator>('default');
  const [property, setProperty] = React.useState<
    keyof Omit<IItem, 'date'> | ''
  >('');
  const [sortBy, setSortBy] = React.useState<keyof IItem | ''>('');

  let filterQuery =
    operator !== 'default'
      ? operator === 'equal'
        ? `?${property}=${query}`
        : `?${property}_${operator}=${query}`
      : '';
  let sortByQuery = sortBy ? `_sort=${sortBy}&_order=asc` : '';
  let questionMarkOrAmpersandBeforeSort = filterQuery ? '&' : '?';

  const BASE_URL = 'http://localhost:3001/items';

  const URL = `${BASE_URL}${filterQuery}${questionMarkOrAmpersandBeforeSort}${sortByQuery}`;

  React.useEffect(() => {
    fetchItems(URL);
  }, []);

  React.useEffect(() => {
    if (query && operator !== 'default' && property) {
      fetchItems(URL);
    }
    if (!query && operator !== 'default' && property && !items.length) {
      fetchItems(BASE_URL + '?' + sortByQuery);
    }
  }, [query, operator, property, sortBy]);

  React.useEffect(() => {
    if (sortBy) {
      fetchItems(URL);
    }
  }, [sortBy]);

  const fetchItems = async (URL: string) => {
    try {
      setIsLoading(true);
      const responce = await fetch(URL);
      const fetchedItems: IItem[] = await responce.json();
      setItems(fetchedItems);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilter = () => {
    setQuery('');
    setOperator('default');
    setProperty('');
    fetchItems(BASE_URL + '?' + sortByQuery);
  };

  const _setProperty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    switch (value) {
      case 'title':
        setProperty(value);
        break;
      case 'quantity':
        setProperty(value);
        break;
      case 'distance':
        setProperty(value);
        break;
    }
  };

  const _setSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    switch (value) {
      case 'date':
        setSortBy(value);
        break;
      case 'title':
        setSortBy(value);
        break;
      case 'quantity':
        setSortBy(value);
        break;
      case 'distance':
        setSortBy(value);
        break;
    }
  };

  const _setOperator = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const operator = e.target.value;

    switch (operator) {
      case 'equal':
        setOperator(operator);
        break;
      case 'gte':
        setOperator(operator);
        break;
      case 'lte':
        setOperator(operator);
        break;
      case 'like':
        setOperator(operator);
        break;
    }
  };

  return (
    <Context.Provider
      value={{
        isLoading,
        items: mergedItems,
        error,
        pages,
        currentPage,
        query,
        operator,
        property,
        sortBy,
        setPage,
        clearFilter,
        setQuery: (e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
        },
        setOperator: _setOperator,
        setProperty: _setProperty,
        setSortBy: _setSortBy,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => React.useContext(Context);

export default AppContexProvider;
