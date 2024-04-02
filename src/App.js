import './App.css';
import Insert from './Insert_Books';
import Library from './Search_Books';
import { Routes, Route, BrowserRouter as Router  } from 'react-router-dom';
import Update from './Update_Books';
// import Demo from './Demo';

function App() {
  return (
    <Router>
    <Routes>
      {/* <Route path="/" element={<Demo />} /> */}
      <Route path="/" element={<Library />} />
      <Route path="insert" element={<Insert />} />
      <Route path="update/:id" element={<Update />} />
      {/* <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NoPage />} /> */}
    </Routes>
    </Router>
  );
}

export default App;
