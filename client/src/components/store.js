import { createStore } from 'redux';

export default createStore((state, action) => {
  if(state === undefined) {
    return {userName: ''};
  }
  if(action.type === 'LOGINED'){
    return {...state, userName: action.userName};
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())