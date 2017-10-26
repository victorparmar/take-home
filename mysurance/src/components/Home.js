// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import img from './img/funny-car-auto-insurance-quote.png';

import type {Insurance} from '../core/appActions';

import HomeInsuranceTable from './HomeInsuranceTable';
import HomeNoInsuranceEmptyState from './HomeNoInsuranceEmptyState';
import appActions from '../core/appActions';

type Props = {
  insurances: Array<Insurance>,
  insuranceCategories: Array<string>,
  insuranceCategoriesFetchIndicator: boolean,
  doRedirect: Function,
  doInsuranceCategoriesGetDataThunk: Function,
  doResetAddInsuranceData: Function
};

const mapStateToProps = (state) => {
  return {
    insurances: state.insurances,
    insuranceCategories: state.insuranceCategories,
    insuranceCategoriesFetchIndicator: state.insuranceCategoriesFetchIndicator
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doRedirect: (location: string) => {
      dispatch(push(location));
    },
    doResetAddInsuranceData: () => {
      dispatch(appActions.addInsuranceSetData({
        title: '',
        yearlyPremium: 0,
        category: ''
      }));
    },
    doInsuranceCategoriesGetDataThunk: (location: ?string) => {
      dispatch(appActions.insuranceCategoriesGetDataThunk(location));
    }
  };
};

class Home extends Component<Props> {

  handleBtnAddInsuranceClick = () => {
    this
      .props
      .doResetAddInsuranceData();
    
    const location = '/add-insurance';
    
    if (this.props.insuranceCategories.length) {
      this.props.doRedirect(location);
      return;
    }

    this.props.doInsuranceCategoriesGetDataThunk(location);
  };

  render() {
    if (this.props.insuranceCategoriesFetchIndicator) {
      return this.renderIndicator();
    }
    
    return this.renderContent();
  }

  renderIndicator() {
    return (
      <div className="loading loading-lg"></div>
    );
  }

  renderContent() {
    return (
      <section className="container grid-xs">

        <p className="app-content">
          <img className="centered img-responsive" src={img} alt="funny"/>
        </p>
      
        {
          this.props.insurances.length ? this.renderInsurances() : this.renderEmptyState()
        }

      </section>
    );
  }

  renderInsurances() {
    return (
      <div>
        <HomeInsuranceTable/>

        <p className="text-center app-content">
          <button
            id="btn-add-insurance"
          className="btn btn-primary"
            onClick={this.handleBtnAddInsuranceClick}>Add an insurance</button>
        </p>
      </div>
    );
  }

  renderEmptyState() {
    return (
      <HomeNoInsuranceEmptyState 
        handleBtnAddInsuranceClick={this.handleBtnAddInsuranceClick}/>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
