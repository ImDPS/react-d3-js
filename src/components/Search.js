import {memo, useState, useEffect, useMemo, useCallback, useRef} from 'react'
import {Link} from 'react-router-dom';

const suggestions = [
    'Madurai',
    'Karnataka',
    'Ladakh',
    'Mumbai',
    'Andhra Pradesh',
    'Alappuzha',
  ];
  
  const districtSuggestions = [
    'Madurai',
    'Ganjam',
    'Alappuzha',
    'Mumbai',
    'Chennai',
  ];
  
  const stateSuggestions = [
    'Andhra Pradesh',
    'Karnataka',
    'Gujarat',
    'West Bengal',
    'Ladakh',
  ];

  function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [expand, setExpand] = useState(false);
    const [results, setResults] = useState([])
    const searchInput = useRef(null);
    // const {t} = useTranslation();

    const [engine, setEngine] = useState(null);
    const [districtEngine, setDistrictEngine] = useState(null);

    const handleChange = () => {

    }

    return (
        <div className='Search'>
            <label className='fadeInUp'>
                Search your district or state
            </label>
            <div className=''>
                <input 
                    type="text"
                    value={searchValue}
                    ref={searchInput}
                    onFocus={setExpand.bind(this,true)}
                    onBlur={setExpand.bind(this, false)}
                    onChange={handleChange}
                />
            </div>

            {searchValue === '' && (
                <span className='search-placeholder'></span>
            )}

            
        </div>
    )
  }

  export default Search;