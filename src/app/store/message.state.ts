import { Message } from '../interface/message';

export interface MessageState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export const initialMessagesState: MessageState = {
  messages: [],
  loading: false,
  error: null,
};
