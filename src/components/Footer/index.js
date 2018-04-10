import React from 'react';

import A from './A';
import Span from './Span';
import Wrapper from './Wrapper';
import Icon from './Icon';
import heartEmoji from './heart.jpg';

const love = <Icon src={heartEmoji} alt="icon" />;
const myGithubPseudo = 'AlexSaenen';
const me = (
  <A
    href={`https://github.com/${myGithubPseudo}`}
    alt="github"
    target="_blank"
    rel='noopener noreferrer'
  >
    @{myGithubPseudo}
  </A>
);

function Footer() {
  console.log('Footer.render()');
  return (
    <Wrapper>
      <Span>Made with {love} by {me}</Span>
    </Wrapper>
  );
}

export default Footer;
