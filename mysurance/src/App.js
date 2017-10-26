// @flow
import React, {Component} from 'react';

import {Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
// import createHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory'; // gh-pages does not support normal routing

// import reduxLogger from 'redux-logger';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import './App.css';

import type {Insurance} from './core/appActions';

import Header from './components/Header';
import Home from './components/Home';
import AddInsuranceForm from './components/AddInsuranceForm';
import Footer from './components/Footer';

import localStorageMiddleware from './redux/localStorageMiddleware';
import appReducer from './core/appReducer';
import appActions from './core/appActions';
import {getObject} from './appUtil';

type Props = {};

const history = createHashHistory();
const store = createStore(appReducer, applyMiddleware(routerMiddleware(history), /*reduxLogger,*/ localStorageMiddleware, thunk));

const storedInsurances: * = getObject('insurances');
if (storedInsurances) {
  storedInsurances.forEach((insurance: Insurance) => {
    store.dispatch(appActions.addInsurance(insurance));
  });
}



class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Header/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/add-insurance" component={AddInsuranceForm}/>
            </Switch>
            <Footer/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
