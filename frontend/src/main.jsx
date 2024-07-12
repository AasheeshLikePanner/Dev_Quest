import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SolutionPage from './component/SolutionPage/SolutionPage.jsx';
import { Home, ProblemPage, CommentPage, NavBar, UserSolutionArchive } from './component/index.js';
import { Toaster, toast } from 'sonner'




const Main = () => (
  <Provider store={store}>
    <Router>
      <NavBar />
      <App/>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solution/comments" element={<SolutionPage />} />
        <Route path="/problem/comments" element={<ProblemPage />} />
        <Route path="/comment/comments" element={<CommentPage />} />
        <Route path="/user-scroll-archive" element={<UserSolutionArchive />} />
      </Routes>
    </Router>
  </Provider>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
