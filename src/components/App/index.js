import React, { Component } from 'react';
import Header from 'components/Header';
import Planner from 'containers/Planner';
import Footer from 'components/Footer';
import Wrapper from './Wrapper';

class App extends Component {
  render() {
    console.log('App.render()');
    return (
      <Wrapper>
        <Header />
        <Planner />
        <Footer />
      </Wrapper>
    );
  }
}

export default App;
