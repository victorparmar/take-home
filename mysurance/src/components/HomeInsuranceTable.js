// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import './HomeInsuranceTable.css';

import type {Insurance} from '../core/appActions';

import HomeDeleteInsuranceModal from './HomeDeleteInsuranceModal';
import appActions from '../core/appActions';

type Props = {
  insurances: Array<Insurance>,
  doRemoveInsurance: Function
};

type State = {
  showModal: boolean,
  modalContent: string,
  doModalActionExecute: Function
};

const mapStateToProps = (state) => {
  return {
    insurances: state.insurances,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doRemoveInsurance: (index: number) => {
      dispatch(appActions.removeInsurance(index));
    }
  };
};

class HomeInsuranceTable extends Component<Props, State> {

  state = {
    showModal: false,
    modalContent: '',
    doModalActionExecute: () => {}
  }

  doModalActionCancel = () => {
    const state = this.state;
    this.setState({
      ...state,
      showModal: false
    });
  }

  handleInsuranceClick = (insurance, index, event) => {
    const state = this.state;

    this.setState({
      ...state,
      showModal: true,
      modalContent: JSON.stringify(insurance),
      doModalActionExecute: () => {
        this.props.doRemoveInsurance(index);
      }
    });
  }

  render() {
    
    let totalExpenses: number = 0;

    this.props.insurances.forEach((insurance: Insurance) => {
      totalExpenses += insurance.yearlyPremium;
    });

    return (
      <div>
        <HomeDeleteInsuranceModal 
          showModal={this.state.showModal}
          content={this.state.modalContent}
          doModalActionCancel={this.doModalActionCancel}
          doModalActionExecute={this.state.doModalActionExecute} />

        <p className="app-content">
          The following is a list of your current insurances. Click on an insurance to delete it.
        </p>

        <table className="table table-striped table-hover table-insurances">
          <thead>
            <tr>
              <th className="text-center">Title</th>
              <th className="text-center">Category</th>
              <th className="text-center">Yearly Premium</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.insurances.map((insurance: Insurance, index: number) => {
                const boundHandleInsuranceClick = this.handleInsuranceClick.bind(this, insurance, index);
                
                return (
                  <tr key={index} onClick={boundHandleInsuranceClick}>
                    <td>{insurance.title}</td>
                    <td className="text-center">{insurance.category}</td>
                    <td className="text-right">{insurance.yearlyPremium}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <p className="text-right">
          <span className="total-expenses-label">Total expenses:</span>
          &nbsp;
          <span className="total-expenses">
            CHF {totalExpenses.toFixed(2)}
          </span>
        </p>

      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeInsuranceTable);
