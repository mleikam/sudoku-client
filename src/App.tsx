import React from 'react';
import { Page, Header, Footer } from './components/layout';
import ControlsContainer from './containers/controls';
import BoardContainer from './containers/board';

const App = () => (
  <Page>
    <Header />
    <BoardContainer />
    <ControlsContainer />
    <Footer />
  </Page>
);

export default App;
