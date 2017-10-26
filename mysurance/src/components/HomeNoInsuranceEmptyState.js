// @flow

import React from 'react';

type Props = {
  handleBtnAddInsuranceClick: Function
};

const HomeNoInsuranceEmptyState = (props: Props) => {

  return (
    <div className="empty">
      <div className="empty-icon">
        <i className="icon icon-people"></i>
      </div>
      
      <p className="empty-title h5">You have no insurances</p>
      <p className="empty-subtitle">Click the button to add an insurance.</p>
      <div className="empty-action">
        <button
          id="btn-add-insurance"
          className="btn btn-primary"
          onClick={props.handleBtnAddInsuranceClick}>Add an insurance</button>
      </div>
    </div>
  );
}

export default HomeNoInsuranceEmptyState;
