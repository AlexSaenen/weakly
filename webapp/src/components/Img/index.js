import React from 'react';

type Props = {
  +className?: string,
  +src: Object | string,
  +alt: string,
};

function Img(props: Props) {
  return (
    <img className={props.className} src={props.src} alt={props.alt} />
  );
}

export default Img;
