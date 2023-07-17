import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './contactList.module.css';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
  }

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = (id) => {
    const updatedContacts = this.props.contacts.filter(contact => contact.id !== id);
    console.log(updatedContacts)
    this.props.updateContacts(updatedContacts);
  }

  render() {
    const { filter } = this.state;
    const { contacts } = this.props;

    const filteredContacts = contacts.filter(contact => {
      const name = contact.name.toLowerCase();
      const filterValue = filter.toLowerCase();
      return name.includes(filterValue);
    });

    return (
      <div className={styles.mainDivContactList}>
        <label htmlFor="find Contact" className={styles.labelInpunFindContact}>Find contacts by name</label>
        <input
          type="text"
          placeholder="Search"
          value={filter}
          onChange={this.handleFilterChange}
          className={styles.inputFindContact}
        />
        <ul>
          {filteredContacts.map(contact => (
            <li key={contact.id} className={styles.liContactList}>
              <p className={styles.textContactList}>{contact.name}:</p>
              <p className={styles.textContactList}>{contact.tel}</p>
              <button type='button' className={styles.deliteBtn} onClick={()=>this.deleteContact(contact.id)}>Detele</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      tel: PropTypes.string.isRequired
    })
  ).isRequired,
  updateContacts: PropTypes.func.isRequired
};

export default ContactList;
