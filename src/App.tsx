import React from 'react';
import { Page, Header, Footer } from './components/layout'
import Controls from './components/controls'
import BoardContainer from './containers/board'

const App = () => (
  <Page>
    <Header />
    <BoardContainer />
    <Controls />
    <Footer />
  </Page>
);

export default App;
