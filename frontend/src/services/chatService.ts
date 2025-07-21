import axios from './api.ts';

export type chatData = {
    msg: string
    // physicist name or id
}

export const sendChat = (chatData: chatData) => axios.post('/chat', chatData);