import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Home from './pages/home';
import NotFound from './pages/not-found';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </>
  );
};

export default App;
