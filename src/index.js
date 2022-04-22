import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NoMatchScreen from "./screens/NoMatchScreen";
import SearchScreen from "./screens/SearchScreen";
import "bootstrap/dist/css/bootstrap.css";
import SearchResultsScreen from "./screens/SearchResultsScreen";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PrivacyScreen from "./screens/PrivacyScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import createPersistStore from "./redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import MoviesCategoryScreen from "./screens/MoviesCategoryScreen";
import AdminScreen from "./screens/AdminScreen";
import EditListScreen from "./screens/EditListScreen";
import CreateNewListScreen from "./screens/CreateNewListScreen";
import {MY_PROFILE_URL, PROFILE_URL} from "./services/utils";

const {store, persistor} = createPersistStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<App/>}>
                        <Route index element={<HomeScreen/>}/>
                        <Route path={"home"} element={<HomeScreen/>}/>
                        <Route path={"admin"} element={<AdminScreen/>}/>
                        <Route path={`${PROFILE_URL}/:uid/*`} element={<ProfileScreen/>}/>
                        <Route path={`${MY_PROFILE_URL}/*`} element={<MyProfileScreen/>}/>
                        <Route path={"lists/new"} element={<CreateNewListScreen/>}/>
                        <Route path={"lists/:lid"} element={<EditListScreen/>}/>
                        <Route path={"search"} element={<SearchScreen/>}/>
                        <Route path={"search/results"} element={<SearchResultsScreen/>}/>
                        <Route path={"movies/:mid"} element={<MovieDetailsScreen/>}/>
                        <Route path={"movies/in/:category"} element={<MoviesCategoryScreen/>}/>
                        <Route path={"login"} element={<LoginScreen/>}/>
                        <Route path={"register"} element={<RegisterScreen/>}/>
                        <Route path={"privacy"} element={<PrivacyScreen/>}/>
                        <Route path={"*"} element={<NoMatchScreen/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
