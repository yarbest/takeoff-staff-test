import React, { useEffect, useRef, useState } from 'react';
import styles from './Search.module.css';

export const Search = ({ onSearchedContacts, contacts }) => {
  const [value, setValue] = useState('');
  const firstRender = useRef(false);

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!firstRender.current) return;
    const serchedContacts = contacts.filter((contact) => contact.name.includes(value) || contact.phone.includes(value));

    onSearchedContacts(serchedContacts);
  }, [value, contacts, onSearchedContacts]);

  //нужно, чтобы useEffect выше не сработал при маунтинге компонента, так как в нем есть колбэк для изменения состояния в компоненте Contacts, поэтому происходит лишний рендер в нем
  useEffect(() => {
    firstRender.current = true;
  }, []);

  return <input onChange={handleValueChange} className={styles.search} value={value} placeholder="Search contact"></input>;
};
