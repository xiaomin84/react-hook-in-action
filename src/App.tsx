import React from 'react'
import Counter from './01/Counter'  
import UserList from './01/UserList'
import SearchUserList from './04/SearchUserList'
import ThemeSwitch from './04/ThemeSwitch'
import Timer from './04/Timer'
import UseAsyncSample from './06/UseAsyncSample'
import UseCounter from './06/UseCounter'
import UseScrollSample from './06/UseScroll'
import BlogList from './06/BlogList'
import ReduxCounter from './07/ReduxCounter'
import FilterList from './08/FilterList'
import SearchBox from './08/SearchBox'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'

const routes: [string, React.ComponentType][] = [
  ["01 Counter", Counter],
  ["02 User List", UserList],
  ["04 Search Users", SearchUserList],
  ["04 Theme Switch", ThemeSwitch],
  ["04 Timer", Timer],
  ["06 Use Async Sample", UseAsyncSample],
  ["06 Use Counter", UseCounter],
  ["06 Use Scroll", UseScrollSample],
  ["06 Blog List", BlogList],
  ["07 Redux Counter", ReduxCounter],
  ["08 Filter List", FilterList],
  ["08 Search Box", SearchBox],
]

function App() {
  return (
    <Router>
      <div className='app'>
        <>
          <ul className='sider'>
            {routes.map(([label]) => (
              <li key={label}>
                <Link to={`/${label.replace(" ", "/")}`}>{label}</Link>
              </li>
            ))}
          </ul>

          <div id='pageContainer' className='page-container'>
            <Routes>
              {routes.map(([label, Component, additionalRoute = ""]) => (
                <Route
                  key={label}
                  path={`/${label.replace(" ", "/")}${additionalRoute}`}
                  element={<Component />}
                />
              ))}
              <Route path='/' element={<h1>Welcome1</h1>} />
              <Route path='*' element={<h1>404 - Not Found</h1>} />
            </Routes>
          </div>
        </>
      </div>
    </Router>
  )
}

export default App
