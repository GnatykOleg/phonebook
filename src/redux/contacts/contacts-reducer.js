import { createReducer } from '@reduxjs/toolkit';
import { setFilter } from './contacts-actions';
import {
  fetchContacts,
  deleteContacts,
  addContacts,
} from './contacts-operations';

export const contactsReducer = createReducer([], {
  [fetchContacts.fulfilled]: (_, { payload }) => payload,
  [addContacts.fulfilled]: (state, { payload }) => [...state, payload],
  [deleteContacts.fulfilled]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

export const loadingReducer = createReducer(false, {
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.pending]: () => true,
  [fetchContacts.rejected]: () => false,
  [deleteContacts.fulfilled]: () => false,
  [deleteContacts.pending]: () => true,
  [deleteContacts.rejected]: () => false,
  [addContacts.fulfilled]: () => false,
  [addContacts.pending]: () => true,
  [addContacts.rejected]: () => false,
});

export const filterReducer = createReducer('', {
  [setFilter]: (_, { payload }) => payload,
});
