// Props: none. Router setup and the shared page chrome.
// Your logic connects: if you lift the watchlist to the top instead of using
// Context, its state goes in Layout and reaches the pages via <Outlet context>.
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import DetailPage from './pages/DetailPage'
import SearchPage from './pages/SearchPage'
import WatchlistPage from './pages/WatchlistPage'

function Layout() {
  return (
    <div className="min-h-dvh">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SearchPage />} />
          <Route path="/anime/:id" element={<DetailPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
