import { Routes, Route } from 'react-router-dom'
import Generic from './pages/Generic.jsx'
import { pages } from './data.js'
import Layout from './layout/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        {Object.keys(pages).map(k => (
          <Route key={k} path={k} element={<Generic slug={k} />} />
        ))}
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
