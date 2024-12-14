import { Message } from '../interface/message';

export interface MessageState {
  messages: Message[];
  isLoaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialMessagesState: MessageState = {
  messages: [],
  isLoaded: false,
  loading: false,
  error: null,
};
