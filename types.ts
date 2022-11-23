// Objects

export type User = {
  _id: string;
  name: string;
  password: string;
  phoneNumber: string;
  dateJoined: string;
  jujuls: number;
  pushNotificationsToken?: string;
};

export type Message = {
  _id: string;
  message: string;
  type: string;
  categories?: string[];
  custom: boolean;
  customOwnerId?: string;
  customApproved?: boolean;
};

export type Juju = {
  _id: string;
  messageId: string;
  message: string;
  senderId: string;
  recipientPhoneNumber: string;
  recipientContactName: string;
  opened: boolean;
  thanks?: string;
  dateSent: string;
};

export type JujuReqObject = {
  messageId: string;
  message: string;
  senderId: string;
  recipientPhoneNumber: string;
  recipientContactName: string;
  opened: boolean;
  thanks?: string;
  dateSent: number;
};

// API

export type SignUpUserReq = {
  name: string;
  password: string;
  phoneNumber: string;
  jujuls: string;
};

export type SignInRes = {
  token?: string;
  status: number;
  user?: User;
  message?: string;
  jujus?: Juju[];
};
