import React from 'react';
import {HashRouter} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import routes from './routes';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        {routes}
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
