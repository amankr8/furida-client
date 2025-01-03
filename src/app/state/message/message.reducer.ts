import { createReducer, on } from '@ngrx/store';
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
} from './message.actions';
import { Message } from '../../shared/interface/message';
import { generalStatus } from '../../shared/constants/global-constants';

export interface MessageState {
  messages: Message[];
  status: string;
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialMessagesState: MessageState = {
  messages: [],
  status: '',
  loaded: false,
  loading: false,
  error: null,
};

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
    loaded: true,
    loading: false,
  })),

  on(loadMessagesFail, (state, { error }) => ({
    ...state,
    loaded: false,
    loading: false,
    error,
  })),

  on(sendMessage, (state) => ({
    ...state,
    error: null,
    status: generalStatus.PENDING,
    loading: true,
  })),

  on(sendMessageSuccess, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
    status: generalStatus.SUCCESS,
    loading: false,
  })),

  on(sendMessageFail, (state, { error }) => ({
    ...state,
    error,
    status: generalStatus.FAILURE,
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
