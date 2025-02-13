import Counter from './01/Counter'  
import UserList from './01/UserList'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'

const routes: [string, React.ComponentType][] = [
  ["01 Counter", Counter],
  ["02 User List", UserList],
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
