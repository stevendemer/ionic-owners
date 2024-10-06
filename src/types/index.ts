export interface User {
  name: string;
  location: string;
  profile_image: string;
}

export interface Message {
  message_id: string;
  from: string;
  message: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  date: string;
  status: string;
  title: string;
  description: string;
  user: User;
  conversation: Message[];
  archived: boolean;
}

export interface TicketData {
  tickets: Ticket[];
}
