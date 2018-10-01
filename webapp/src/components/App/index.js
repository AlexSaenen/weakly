/* @flow */

import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import Header from 'components/Header';
import Planner from 'components/Planner';
import Footer from 'components/Footer';

import Wrapper from './Wrapper';

function App() {
  console.log('App.render()');
  return (
    <Wrapper>
      <Header />
      <Planner />
      <Footer />
    </Wrapper>
  );
}

export default DragDropContext(HTML5Backend)(App);
