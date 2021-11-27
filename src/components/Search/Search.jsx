import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

export const Search = ({ onSearchedContacts, contacts }) => {
  const [value, setValue] = useState('');

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const serchedContacts = contacts.filter((contact) => new RegExp(value).test(contact.name) || new RegExp(value).test(contact.phone));

    onSearchedContacts(serchedContacts);
  }, [value, contacts, onSearchedContacts]);

  return <input onChange={handleValueChange} value={value} placeholder="Search contact"></input>;
};
