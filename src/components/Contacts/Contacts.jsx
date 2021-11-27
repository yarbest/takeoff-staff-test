import React from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react/cjs/react.development';
import { deleteContact, signOut } from '../../utils/utils';
import { Search } from '../Search/Search';

import styles from './Contacts.module.css';

export const Contacts = ({ onModalOpen, currentUser, onContactDelete, onValuesToEditChange }) => {
  const navigate = useNavigate();
  const [searchedContacts, setSearchedContacts] = useState(currentUser.contacts);

  const handleDeleteContact = async (phone) => {
    const updatedCurrentUser = await deleteContact(phone);
    onContactDelete(updatedCurrentUser);
  };

  const handleUpdateContact = (name, phone) => {
    onValuesToEditChange({ name, phone });
    onModalOpen(true);
  };

  return (
    <div className={styles.wrap}>
      <button onClick={() => signOut(() => navigate('/login'))} className={styles.signOutBtn}>
        Sign Out
      </button>
      <div className={styles.body}>
        <h1 className={styles.title}>Hello {currentUser.email.split('@')[0]}! Your contacts:</h1>

        <Search onSearchedContacts={setSearchedContacts} contacts={currentUser.contacts} />

        <ul className={styles.contacts}>
          {searchedContacts.map(({ name, phone }, i) => (
            <li key={phone} className={styles.contact}>
              <span className={styles.contactData}>
                {i + 1}: Name: {name}, Phone: {phone}
              </span>
              <span onClick={() => handleUpdateContact(name, phone)} className={styles.btnContactEdit}>
                Edit
              </span>
              <span onClick={() => handleDeleteContact(phone)} className={styles.btnContactDelete}>
                X
              </span>
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
