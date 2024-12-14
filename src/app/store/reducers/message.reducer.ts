import { createReducer, on } from '@ngrx/store';
import { initialMessagesState } from '../message.state';
import {
  deleteMessage,
  deleteMessageFail,
  deleteMessageSuccess,
  loadMessages,
  loadMessagesFail,
  loadMessagesSuccess,
  sendMessage,
  sendMessageFail,
  sendMessageSuccess,
  toggleArchive,
  toggleArchiveFail,
  toggleArchiveSuccess,
} from '../actions/message.actions';

export const messageReducer = createReducer(
  initialMessagesState,

  on(loadMessages, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages,
    loading: false,
  })),

  on(loadMessagesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(sendMessage, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(sendMessageSuccess, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
    loading: false,
  })),

  on(sendMessageFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(toggleArchive, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(toggleArchiveSuccess, (state, { message }) => ({
    ...state,
    messages: state.messages.map((msg) =>
      msg.id === message.id ? message : msg
    ),
    loading: false,
  })),

  on(toggleArchiveFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(deleteMessage, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(deleteMessageSuccess, (state, { messageId }) => ({
    ...state,
    messages: state.messages.filter((message) => message.id !== messageId),
    loading: false,
  })),

  on(deleteMessageFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
