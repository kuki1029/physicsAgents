import axios from './api.ts';

export type chatData = {
    msg: string
    id: string
}

export const sendChat = (chatData: chatData) => axios.post('/chat', chatData);