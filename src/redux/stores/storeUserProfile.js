// src/redux/stores/storeUserProfile.js
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Untuk menggunakan localStorage
import { Provider } from 'react-redux';
import reducersEmployee from '../reducers/reducersEmployee'; // Impor reducer

// Setup persist config
const persistConfig = {
  key: 'root',
  storage, // Menggunakan localStorage
};

// Persist reducer
const persistedReducer = persistReducer(persistConfig, reducersEmployee);

// Create Redux store
const rootReducer = combineReducers({
  employees: persistedReducer,
});

const store = createStore(rootReducer);

// Persistor untuk Redux Persist
const persistor = persistStore(store);

export { store, persistor };
