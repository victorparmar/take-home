// @flow

import React from 'react';

import './Footer.css';

type Props = {};

const Footer = (props: Props) => {

  return (
    <footer className="bg-gray">
      <section className="grid-footer container grid-xs">
        <div className="mysurance logo">
          MySurance
        </div>
        <div>
        We do not use any cookies nor store any personal information. All data is stored in browser localStorage (if enabled).
        </div>
        <div>
          Licensed under the <a href="https://github.com/wheresvic/mysurance/blob/master/LICENSE">MIT License</a>.
        </div>
      </section>
    </footer>
  );

};

export default Footer;
