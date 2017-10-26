// @flow
import React, {Component} from 'react';

type Props = {
  showModal: boolean,
  content: string,
  doModalActionCancel: Function,
  doModalActionExecute: Function
};

class HomeDeleteInsuranceModal extends Component<Props> {

  handleCancelClick = (event: *) => {
    event.preventDefault();
    this
      .props
      .doModalActionCancel();
  }

  handleOkClick = (event: *) => {
    event.preventDefault();
    this
      .props
      .doModalActionExecute();
    this
      .props
      .doModalActionCancel();
  }

  render() {
    if (!this.props.showModal) {
      return null;
    }

    return (
      <div
        id="delete-insurance-modal"
        className="modal modal-sm active">
        <div className="modal-overlay"></div>
        <div className="modal-container" role="document">
          <div className="modal-header">
            {/*<button type="button" className="btn btn-clear float-right" aria-label="Close"></button>*/}
            <div className="modal-title">
              <h6>Delete Insurance</h6>
            </div>
          </div>
          <div className="modal-body">
            <div className="content">
              <p>Are you sure you want to delete the following insurance?</p>
              <code className="smash-it">{this.props.content}</code>
            </div>
          </div>
          <div className="modal-footer">
            {this.renderButtonCancel()}
            &nbsp;
            {this.renderButtonExecute()}
          </div>
        </div>
      </div>
    );
  }

  renderButtonCancel() {
    return (
      <button
        className="btn"
        type="button"
        onClick={this.handleCancelClick}>Cancel</button>
    );
  }

  renderButtonExecute() {
    return (
      <button className="btn btn-primary" type="button" onClick={this.handleOkClick}>Delete</button>
    );
  }

};

export default HomeDeleteInsuranceModal;
