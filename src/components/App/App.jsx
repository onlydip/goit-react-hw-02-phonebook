import React, { Component } from 'react';

export default class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, contacts } = this.state;

    if (name.trim() === '') {
      alert('Будь ласка, введіть ім контакту.');
      return;
    }

    // Перевіряємо, чи ім'я вже існує у списку
    if (contacts.some((contact) => contact.name === name)) {
      alert('Контакт з таким ім вже існує.');
      return;
    }

    const newContact = {
      id: Date.now(),
      name,
    };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
    }));
  };

  render() {
    const { name, contacts } = this.state;

    return (
      <div>
        <h1>Книга контактів</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            placeholder="Введіть ім контакту"
            required
          />
          <button type="submit">Додати контакт</button>
        </form>
        <h2>Список контактів:</h2>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>{contact.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
