// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import img from './img/insurance-coverage.jpg';

import AddInsuranceFormHint from './AddInsuranceFormHint';

import type {Insurance, AddInsurance} from '../core/appActions';
import appActions from '../core/appActions';

type Props = {
  insuranceCategories: Array<string>,
  insuranceCategoriesFetchIndicator: boolean,
  addInsurance: AddInsurance,
  doRedirect: Function,
  doInsuranceCategoriesGetDataThunk: Function,
  doAddInsuranceSetData: Function,
  doAddInsuranceSaveThunk: Function
};

const mapStateToProps = (state) => {
  return {
    insuranceCategories: state.insuranceCategories, 
    insuranceCategoriesFetchIndicator: state.insuranceCategoriesFetchIndicator, 
    addInsurance: state.addInsurance
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doInsuranceCategoriesGetDataThunk: (location: ?string) => {
      dispatch(appActions.insuranceCategoriesGetDataThunk(location));
    },
    doAddInsuranceSetData: (insurance: Insurance) => {
      dispatch(appActions.addInsuranceSetData(insurance));
    },
    doAddInsuranceSaveThunk: (insurance: Insurance, insuranceCategories: Array<string>, location: ?string) => {
      dispatch(appActions.addInsuranceSaveThunk(insurance, insuranceCategories, location));
    }
  };
};

class AddInsuranceForm extends Component<Props> {

  componentDidMount() {
    // in case this is the first page loaded
    if (this.props.insuranceCategories.length === 0) {
      this
        .props
        .doInsuranceCategoriesGetDataThunk();  
    }
  }

  handleTitleChange = (event) => {
    this
      .props
      .doAddInsuranceSetData({
        ...this.props.addInsurance,
        title: event.target.value
      });
  }

  handleYearlyPremiumChange = (event) => {
    const value = parseInt(event.target.value, 10);
    this
      .props
      .doAddInsuranceSetData({
        ...this.props.addInsurance,
        yearlyPremium: value
      });
  }

  handleCategorySelectionChange = (event) => {
    this
      .props
      .doAddInsuranceSetData({
        ...this.props.addInsurance,
        category: event.target.value
      });
  }

  handleSaveInsuranceClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const insurance: Insurance = {
      title: this.props.addInsurance.title,
      yearlyPremium: this.props.addInsurance.yearlyPremium,
      category: this.props.addInsurance.category
    };

    if (this.props.addInsurance.titleErrorMsg === '' &&
        this.props.addInsurance.yearlyPremiumErrorMsg === '') {
      this
        .props
        .doAddInsuranceSaveThunk(insurance, this.props.insuranceCategories, '/');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    if (this.props.insuranceCategoriesFetchIndicator) {
      return this.renderIndicator();
    }

    return this.renderForm();
  }

  renderIndicator() {
    return (
      <div className="loading loading-lg"></div>
    );
  }

  renderForm() {
    const renderedInsuranceCategoryOptions = this.props.insuranceCategories.map((insuranceCategory: string) => {
      return (
        <option key={insuranceCategory} value={insuranceCategory}>{insuranceCategory}</option>
      );
    });
    
    return (
      <section className="container grid-xs">
        <h5>Add an insurance</h5>

        <p className="app-content">
          <img className="centered img-responsive" src={img} alt="funny"/>
        </p>

        <div className="columns app-content">
          <div className="column col-12">

            <form className="form-horizontal" onSubmit={this.handleSubmit}>

              <div className="form-group">
                <div className="col-4">
                  <label className="form-label">Title</label>
                </div>
                <div className="col-8">
                  <input
                    id="title"
                    className="form-input"
                    type="text"
                    value={this.props.addInsurance.title}
                    onChange={this.handleTitleChange}/>
                </div>
              </div>

              <AddInsuranceFormHint formHint={this.props.addInsurance.titleErrorMsg}/>

              <div className="form-group">
                <div className="col-4">
                  <label className="form-label">Yearly premium</label>
                </div>
                <div className="col-8">
                  <div className="input-group">
                    <span className="input-group-addon">CHF</span>
                    <input
                      id="yearly-premium"
                      className="form-input"
                      type="number"
                      min="0"
                      value={isNaN(this.props.addInsurance.yearlyPremium) ? '' : this.props.addInsurance.yearlyPremium}
                      onChange={this.handleYearlyPremiumChange}/>
                  </div>
                </div>

              </div>

              <AddInsuranceFormHint formHint={this.props.addInsurance.yearlyPremiumErrorMsg}/>

              <div className="form-group">
                <div className="col-4">
                  <label className="form-label">Category</label>
                </div>
                <div className="col-8">
                  <select
                    className="form-select"
                    value={this.props.addInsurance.category}
                    onChange={this.handleCategorySelectionChange}>
                    {renderedInsuranceCategoryOptions}
                  </select>
                </div>
              </div>

              <div className="form-group main-action">
                <div className="col-12 text-center">
                  <button
                    id="btn-save-insurance"
                    type="submit"
                    className={"btn btn-primary " + ((this.props.addInsurance.titleErrorMsg || this.props.addInsurance.yearlyPremiumErrorMsg ||
                      !this.props.addInsurance.title)
                    ? 'disabled'
                    : '')}
                    onClick={this.handleSaveInsuranceClick}>
                    Save Insurance
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>

      </section>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInsuranceForm);
