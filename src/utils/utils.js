import { toast } from 'react-toastify';

export const validateEmailAndPassword = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email address';

  if (!values.password) errors.password = 'Required';
  else if (values.password.length < 8) errors.password = 'Must be 8 characters or more';

  return errors;
};

export const fetchUsers = async (userId = '') => {
  const response = await fetch(`http://localhost:3001/users/${userId}`); //порт 3001 указывается при запуске json-server
  if (!response.ok) {
    error('Couldn"t fetch users!');
    return;
  }

  return await response.json();
};

export const addNewContact = async (values) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  currentUser.contacts.push(values); //добавляем в массив контактов новые данные

  const { id, ...currentUserData } = currentUser;

  const response = await fetch(`http://localhost:3001/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(currentUserData),
  });

  if (!response.ok) {
    error('Couldn"t add contacts!');
    return;
  }

  const updatedUserData = await response.json();
  localStorage.setItem('currentUser', JSON.stringify(updatedUserData));

  return updatedUserData;
};

export const deleteContact = async (phone) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const { id, ...currentUserData } = currentUser;
  currentUserData.contacts = currentUserData.contacts.filter((contact) => contact.phone !== phone);

  const response = await fetch(`http://localhost:3001/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(currentUserData),
  });

  if (!response.ok) {
    error('Couldn"t remove contact!');
    return;
  }

  const updatedUserData = await response.json();
  localStorage.setItem('currentUser', JSON.stringify(updatedUserData));

  return updatedUserData;
};

export const login = async (values, onSuccess) => {
  const users = await fetchUsers();
  const currentUser = getAuthorizedUser(users, values);

  if (currentUser) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    onSuccess(currentUser);
  } else {
    error('Wrong credentials!');
  }
};

export const signOut = (cb) => {
  localStorage.removeItem('currentUser');
  cb();
};

export const getAuthorizedUser = (users, values) =>
  users.find(({ email, password }) => values.email === email && values.password === password);

export const error = (text) => {
  toast.error(text, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const checkIfPhoneExists = (phone) =>
  JSON.parse(localStorage.getItem('currentUser')).contacts.find((contact) => contact.phone === phone);
