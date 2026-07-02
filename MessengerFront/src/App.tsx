import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '@/styles/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/todo">Список задач</Link>
      </nav>

      <Routes>
        <Route path="/todo" element={<h1>Список задач</h1>} />
      </Routes>
    </BrowserRouter>
  );
}