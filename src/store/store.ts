import { configureStore, Middleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';

const Logger: Middleware = () => (next) => (action) => next(action);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, Logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
