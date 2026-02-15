import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <div className="layout">
      <header className="app-header">
        <h1>Auction Easy</h1>
        <nav>
          <Link to="/">물건 목록</Link>
          <Link to="/admin">관리자 등록</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}
