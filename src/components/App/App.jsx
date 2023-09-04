import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Section  from 'components/Section';
import  Phonebook  from 'components/Phonebook';
import  ContactsList  from 'components/ContactsList';
import  ContactFilter  from 'components/ContactFilter';



import { FirstTitle, SecondTitle } from './App.styled'

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  contactHandler = data => {
    const { contacts } = this.state;
    const findContact = contacts.find(contact => contact.name === data.name);
    if (findContact) {
      alert(`${data.name} is already in contact`);
    } else {
      const contact = {
        id: nanoid(),
        ...data,
      };
      contacts.push(contact);
      this.setState({
        contacts,
      });
    }
  };

  handleSearchChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onFilteredContacts = value => {
    const filterNormalize = value.toLowerCase();
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filterNormalize);
    });
  };

  onContactDelete = id => {
    const { contacts } = this.state;
    const contactToDelete = contacts.filter(contact => {
      return contact.id !== id;
    });
    this.setState({
      contacts: contactToDelete,
    });
  };

  render() {
    const { filter } = this.state;
    return (
      <Section>
        <FirstTitle>Phonebook</FirstTitle>
        <Phonebook onSubmit={this.contactHandler} title="Phonebook" />
          <SecondTitle>Contacts</SecondTitle>
        <ContactFilter
          value={filter}
          title="Find contacts by name:"
          onChange={this.handleSearchChange}
        />
      
        <ContactsList
          title="Contacts"
          filteredContacts={this.onFilteredContacts(filter)}
          onContactDelete={this.onContactDelete.bind(this)}
        />
      </Section>
    );
  }
}
