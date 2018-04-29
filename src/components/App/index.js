import React from 'react';
import Header from 'components/Header';
import Planner from 'containers/Planner';
import Footer from 'components/Footer';
import Wrapper from './Wrapper';

function App() {
  // render() {
    console.log('App.render()');
    return (
      <Wrapper>
        <Header />
        <Planner />
        <Footer />
      </Wrapper>
    );
  // }
}

export default App;
