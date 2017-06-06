import { GET_ADVERTS, GET_ADVERT_BY_ID } from './advertActions';
import createReducer from './../../utils/reduxUtils';

const initialState = {
  currentAdvertId: null,
  currentCategoryId: null,
  advertsOnPage: [],
  currentAdvert: {}
}

function getAdverts(state, action) {
  return {
    ...state,
    advertsOnPage: action.payload,
  }
}

function getAdvertById(state, action) {
  return {
    ...state,
    currentAdvert: action.payload,
  }
}

const adverts = createReducer(initialState, {
  [GET_ADVERTS]: getAdverts,
  [GET_ADVERT_BY_ID]: getAdvertById,
});

export default adverts;