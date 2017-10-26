import {c} from '../core/appActions';

import {storeObject} from '../appUtil';

const localStorageMiddleware = ({ dispatch, getState }) => next => action => {
  switch (action.type) {

    case c.ADD_INSURANCE:
    case c.REMOVE_INSURANCE:
      
      const ret = next(action);
      const insurances = getState().insurances;
      storeObject('insurances', insurances);
      return ret;

    default:
      break;
  }

  return next(action);
};

export default localStorageMiddleware;
