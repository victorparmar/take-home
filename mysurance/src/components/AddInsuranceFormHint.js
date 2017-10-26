// @flow

import React from 'react';

type AddInsuranceFormHintProps = {
  formHint: string
};

const AddInsuranceFormHint = (props: AddInsuranceFormHintProps) => {
  if (!props.formHint) {
    return null;
  }

  return (
    <div className="form-group form-input-hint fade-in">
      <div className="col-4"></div>
      <div className="col-8">
        {props.formHint}
      </div>
    </div>
  )
};


export default AddInsuranceFormHint;
