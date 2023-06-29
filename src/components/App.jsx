import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm.js';
import Filter from './Filter/Filter.js';
import ContactList from './ContactList/ContactList.js';
import css from './App.module.css';
import { nanoid } from 'nanoid';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onAddContact = ({ name, number }) => {
    const isExist = this.state.contacts.some(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  onChangeFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  onRemoveContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(localContacts) ?? [];
    this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  render() {
    const { contacts, filter } = this.state,
      filteredContacts = this.getFilteredContacts();
    return (
      <div className={css.app}>
        <div className={css.container}>
          <h1>Phonebook</h1>
          <ContactForm onAddContact={this.onAddContact} />

          <h2>Contacts</h2>
          <Filter value={filter} onChangeFilter={this.onChangeFilter} />
          {contacts.length === 0 ? (
            <p className={css.contactsEmptyText}>The contact list is empty</p>
          ) : (
            <ContactList
              filteredContacts={filteredContacts}
              onRemoveContact={this.onRemoveContact}
            />
          )}
        </div>
      </div>
    );
  }
}
