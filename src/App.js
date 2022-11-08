import logo from './logo.svg';
import './App.scss';
import {lazy, useState, Suspense, useEffect} from 'react';
import {Route, Redirect, BrowserRouter as Router, Routes,  useLocation} from "react-router-dom"; 
import { retry } from './utils/commonFunctions';

const Home = lazy(() => retry(() => import("./components/Home")))
const Blog = lazy(() => retry(() => import("./components/Blog")))

const App = () => {
  // const location = useLocation();

  const pages = [
    {
      pageLink: '/',
      view: Home,
      displayName: 'Home',
    },
    {
      pageLink: '/blog',
      view: Blog,
      displayName: 'Blog',
    },
  ];

  // useEffect(() => {
  //   console.log("use App.js")
  // }, [])

  return (
    <div className='App'>
      <Suspense fallback={<div><text>No</text></div>}>
        <Router >
          <Routes >
            {pages.map((page, index) => {
              return (
                <Route
                  exact
                  path={page.pageLink}
                  element={<page.view />}
                  key={index}
                />
              );
            })}
          </Routes>
        </Router>
      </Suspense>
    </div>
  )
}

export default App;
