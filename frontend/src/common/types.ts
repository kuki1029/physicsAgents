import albert from '../assets/images/albert.jpg';
import richard from '../assets/images/richard.jpg';
import nikola from '../assets/images/tesla.jpg';
import galileo from '../assets/images/galileo.jpg';
import paul from '../assets/images/paul.jpg';

export type ChatMessage = {
  me: boolean;
  msg: string;
};

export type Chat = {
  id: string;
  userId: string;
  messages: ChatMessage[];
};

export type ChatUser = {
  id: string;
  name: string;
  desc: string;
  avatar: string;
};

export type resMsg = {
  chunk?: string;
  response?: string;
};

export const defaultChatsList: ChatUser[] = [
  {
    name: 'Richard Feynman',
    avatar: richard,
    id: 'richard',
    desc: 'Playful genius who explains physics like magic.',
  },
  {
    name: 'Nikola Tesla',
    avatar: nikola,
    id: 'tesla',
    desc: 'Eccentric inventor obsessed with wireless energy.',
  },
  {
    name: 'Galileo Galilei',
    avatar: galileo,
    id: 'galileo',
    desc: 'Rebel scientist who defied the Church.',
  },
  {
    name: 'Albert Einstein',
    avatar: albert,
    id: 'albert',
    desc: 'Quirky thinker who bent space and time.',
  },
  {
    name: 'Paul Dirac',
    avatar: paul,
    id: 'paul',
    desc: 'Silent genius who spoke only in equations.',
  },
];

export const chatMessages: Chat[] = [
  {
    id: '1',
    userId: 'richard',
    messages: [],
  },
];
