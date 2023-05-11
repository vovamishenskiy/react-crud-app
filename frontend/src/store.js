import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from "./reducers/notesReducers";
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    noteList: noteListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    noteCreate: noteCreateReducer,
    noteDelete: noteDeleteReducer,
    noteUpdate: noteUpdateReducer,
    userUpdate: userUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store