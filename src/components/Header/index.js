import React from 'react';
import Wrapper from './Wrapper';
import Title from './Title';
import Subtitle from './Subtitle';

function Header() {
  console.log('Header.render()');
  return (
    <Wrapper>
      <Title>Welcome to Weakly</Title>
      <Subtitle>A routine for the week</Subtitle>
    </Wrapper>
  );
}

export default Header;
