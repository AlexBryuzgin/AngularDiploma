import { GET_ADVERTS } from './advertActions';
import createReducer from './../../utils/reduxUtils';

const initialState = {
  currentAdvertId: null,
  currentCategoryId: null,
  advertsOnPage: [],
}

function getAdverts(state, action) {
  return {
    ...state,
    advertsOnPage: action.payload,
  }
}

const adverts = createReducer(initialState, {
  [GET_ADVERTS]: getAdverts,
});

export default adverts;