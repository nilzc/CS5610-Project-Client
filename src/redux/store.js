import {createStore} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createPersistStore = () => {
    let store = createStore(persistedReducer);
    let persistor = persistStore(store);
    return {store, persistor}
}

export default createPersistStore;
