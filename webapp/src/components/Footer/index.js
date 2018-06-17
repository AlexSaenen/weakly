import React, { type Node } from 'react';

import A from './A';
import Span from './Span';
import Wrapper from './Wrapper';
import Icon from './Icon';
import heartEmoji from './heart.jpg';

const love: Node = <Icon src={heartEmoji} alt="icon" />;
const myGithubPseudo: string = 'AlexSaenen';
const me: Node = (
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
