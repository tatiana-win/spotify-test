import { SearchIcon } from '../../icons/SearchIcon';
import { CloseIcon } from '../../icons/CloseIcon';
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import debounce from 'lodash.debounce';

import './SearchInput.css';

interface Props {
  onChange: (value?: string) => void;
  defaultValue?: string;
}
export const SearchInput = ({ onChange, defaultValue }: Props) => {
  const [query, setQuery] = useState(defaultValue);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target?.value);
    setQuery(e.target?.value);
  }, []);

  const debouncedSearch = useMemo(() => debounce(onChange, 300), []);

  const handleKeyUp = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // @ts-ignore
      const q = e.target?.value;
      onChange(q);
      setQuery(q);
    }
  }, []);

  const handleClear = useCallback(() => {
    onChange();
    setQuery('');
  }, [onChange]);

  return (
    <div className='search-input-container'>
      <span className='search-input-icon'>
        <SearchIcon />
      </span>
      <input
        name='q'
        defaultValue={defaultValue}
        className='input search-input'
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        autoFocus
      />
      {!!query && (
        <span className='search-input-clear' onClick={handleClear}>
          <CloseIcon />
        </span>
      )}
    </div>
  );
};
