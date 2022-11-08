import React from 'react'
import '../App.scss'

import {useMemo, useRef, useState, lazy, Suspense} from 'react';
import {Helmet} from 'react-helmet';

import {max} from "date-fns"
// import {useLocation} from 'react-router-dom';

import {
    fetcher,
    formatDateObjIndia,
    parseIndiaDate,
    retry,
  } from '../utils/commonFunctions';
import {
    API_REFRESH_INTERVAL,
    DATA_API_ROOT
} from "../constants"
import useStickySWR from './hooks/useStickySWR';
import Minigraphs from './Minigraphs';
import Actions from './Actions';
import {useLocalStorage, useSessionStorage, useWindowSize} from 'react-use';
import Level from './Level';


const Search = lazy(() => retry(() => import("./Search")))

const Home = () => {

    const [date, setDate] = useState('');

    const {width} = useWindowSize();
    const [expandTable, setExpandTable] = useLocalStorage('expandTable', false);
    const [mapStatistic, setMapStatistic] = useSessionStorage(
        'mapStatistic',
        'active'
    );
    
    const {data: timeseries} = useStickySWR(
        `${DATA_API_ROOT}/timeseries.min.json`,
        fetcher,
        {
            revalidateOnMount: true,
            refreshInterval: API_REFRESH_INTERVAL,
        }
    );

    const {data} = useStickySWR(
        `${DATA_API_ROOT}/data${date ? `-${date}` : ''}.min.json`,
        fetcher,
        {
          revalidateOnMount: true,
          refreshInterval: API_REFRESH_INTERVAL,
        }
      );

    const lastUpdatedDate = useMemo(() => {
        const updatedDates = Object.keys(data || {})
          .map((stateCode) => data?.[stateCode]?.meta?.['last_updated'])
          .filter((datetime) => datetime);
        return updatedDates.length > 0
          ? formatDateObjIndia(
              max(updatedDates.map((datetime) => parseIndiaDate(datetime)))
            )
          : null;
      }, [data]);

    return (
        <>
            <Helmet>
                <title>React visualisations in D3.js</title>
                <meta
                    name="title"
                    content="React visualisations in D3.js"
                />
            </Helmet>

            <div className='Home'>
                <div className='header'>
                    <Suspense fallback={<div />}>
                        <Search />
                    </Suspense>
                </div>
            </div>
            
            {data && (
              <Suspense fallback={<div style={{height: '50rem'}} />}>
                {/* {width >= 769 && !expandTable && (
                  <MapSwitcher {...{mapStatistic, setMapStatistic}} />
                )} */}
                <Level data={data['TT']} />
              </Suspense>
            )}

            {timeseries && (
                <Suspense fallback={<div style={{height: '123px'}} />}>
                  <Minigraphs
                    timeseries={timeseries['TT']?.dates}
                    {...{date}}
                  />
                </Suspense>
            )}
        </>
      )
}

export default Home;