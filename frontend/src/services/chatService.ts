import axios from './api.ts';

export type chatData = {
    msg: string
    id: string
}

// OLD
export const sendChat = (chatData: chatData) => axios.post('/chat', chatData);