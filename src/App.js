import React from 'react';
import {withRouter} from 'react-router-dom';
import Header from './Components/Header/Header';
import SideMenu from './Components/SideMenu/SideMenu';
import Footer from './Components/Footer/Footer';
import routes from './routes';
import './App.css';

function App(props) {
  return (
      <div className="App">
        {props.match.url === '/'
        ?(
          <>
            {routes}
          </>
        )
        :(<>
            <Header />
            <SideMenu />
            {routes}
            <Footer />
          </>)}
      </div>
  );
}

export default withRouter(App);
