
import { createStore, applyMiddleware, combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import AuthReducer from "./reducer/AuthReducer";
import thunkMiddleware from 'redux-thunk';
import UserReducer from "./reducer/userReducer";
import DashboardReducer from './reducer/DashboardReducer';
import TodoReducer from './reducer/todoReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import LoaderReducer from './reducer/loader';
import ModelLoaderReducer from './reducer/modeLoaderReducer';
import { ENVIROMENT } from '../config/Env'; 

const rootReducer = combineReducers({
  customization: customizationReducer,
  auth: AuthReducer,
  UserReducer,
  DashboardReducer,
  TodoReducer,
  LoaderReducer,
  ModelLoaderReducer,
})

const middleware = [thunkMiddleware];

const Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
    // ENVIROMENT === "DEV" ? composeWithDevTools(applyMiddleware(...middleware)) : applyMiddleware(...middleware)
);

export default Store;