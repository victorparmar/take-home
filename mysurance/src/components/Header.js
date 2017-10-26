// @flow

import React from 'react';

import './Header.css';

type Props = {};

const Header = (props: Props) => {

  return (
    <div className="bg-gray" style={{marginBottom: '1rem'}}>
      <section className="container grid-xs" style={{paddingTop: '2rem', paddingBottom: '1rem'}}>
        <h1 className="text-center title mysurance">MySurance</h1>
        <div className="text-center subtitle">Stay secured, live free!</div>
      </section>
    </div>
  );

};

export default Header;
