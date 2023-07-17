import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './App.module.css';
import ContactForm from './ContactForm/constactForm';
import ContactList from './ContactList/contactList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      // filter: '',
    };
  }

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  updateContacts = updatedContacts => {
    this.setState({ contacts: updatedContacts });
  };

  render() {
    const { contacts } = this.state;

    return (
      <div className={styles.mainDiv}>
        <h2>Phonebook</h2>
        <ContactForm contacts={contacts} addContact={this.addContact} />
        <h3>Contacts</h3>
        <ContactList updateContacts={this.updateContacts} contacts={contacts} />
      </div>
    );
  }
}

export default App;

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      tel: PropTypes.string.isRequired,
    })
  ),
  addContact: PropTypes.func,
  updateContacts: PropTypes.func,
};
