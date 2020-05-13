import React from 'react';
import { Page, Header, Footer } from './components/layout'
import ControlsContainer from './containers/controls'
import BoardContainer from './containers/board'
// import Trigger from './temp/trigger'

const App = () => (
  <Page>
    <Header />
    <BoardContainer />
    <ControlsContainer />
    <Footer />
  </Page>
);
    // <Trigger />

export default App;
