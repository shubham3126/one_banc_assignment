import ENV from './Environments';

const AppConstant = {
  CONSTANT_MESSAGES: {
    YOU_PAID: 'You paid',
    YOU_REQUESTED: 'You requested',
    YOU_RECIEVED: 'You recieved',
    REQUESTED_RECIEVED: 'Requested recieved',
  },
  USER: {
    NAME: 'John Doe',
    CONTACT: 76722345,
  },
  BTN_TITLE: {
    PAY: 'Pay',
    CANCEL: 'Cancel',
    DECLINE: 'Decline',
  },
  URLS: {
    TRANSACTION_HISTORY: `${ENV.API_HOST}GetTransactionHistory`,
  },
};

export default AppConstant;
