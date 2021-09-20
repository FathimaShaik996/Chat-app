export interface Message {
  id: string;
  sender: {
    name: string;
    profileImage: string;
  };
  content: string;
  read: boolean;
  date: string;
}
