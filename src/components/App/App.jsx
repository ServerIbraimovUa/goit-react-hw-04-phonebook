import { nanoid } from 'nanoid';

import { useState, useEffect } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import { Container } from './App.styled';
import Filter from 'components/Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contact')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }
    const newState = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([newState, ...contacts]);
  };

  const onSearchContact = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilterContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      {contacts.length === 0 ? (
        <h3>Empty</h3>
      ) : (
        <>
          <Filter onChange={onSearchContact} filter={filter} />
          <ContactList
            contacts={getFilterContacts()}
            onDelete={deleteContact}
          />
        </>
      )}
    </Container>
  );
}
