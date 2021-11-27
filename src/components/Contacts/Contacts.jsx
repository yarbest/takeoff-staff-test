import React from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react/cjs/react.development';
import { signOut } from '../../utils/utils';
import { Search } from '../Search/Search';

import styles from './Contacts.module.css';

export const Contacts = ({ onModalOpen, currentUser }) => {
  const navigate = useNavigate();
  console.log(currentUser);
  const [searchedContacts, setSearchedContacts] = useState(currentUser.contacts);
  console.log(searchedContacts);
  return (
    <div className={styles.wrap}>
      <button onClick={() => signOut(() => navigate('/login'))} className={styles.signOutBtn}>
        Sign Out
      </button>
      <div className={styles.body}>
        <h1 className={styles.title}>Your contacts</h1>
        <Search onSearchedContacts={setSearchedContacts} contacts={currentUser.contacts} />
        <ul className={styles.contacts}>
          {searchedContacts.map(({ name, phone }, i) => (
            <li key={phone} className={styles.contact}>
              {i + 1}: Name: {name}, Phone: {phone}
            </li>
          ))}
        </ul>

        <button onClick={onModalOpen} className={styles.addNewBtn}>
          + Add a new Contact
        </button>
      </div>
    </div>
  );
};
