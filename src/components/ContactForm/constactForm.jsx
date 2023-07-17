import { nanoid } from "nanoid";
import React, {Component} from "react";
import PropTypes from 'prop-types'
import styles from './contactForm.module.css'

class ContactForm extends Component {
    constructor (props){
        super(props)
        this.state = {
            name:'',
            tel:''
        }
    this.nameChange = this.nameChange.bind(this)
    this.telChange = this.telChange.bind(this)
    this.addNewContact = this.addNewContact.bind(this)
    }

    nameChange(e){
        this.setState({name: e.target.value})
    }

    telChange(e){
        this.setState({tel: e.target.value})
    }

    addNewContact (){
        const {name, tel} = this.state;
        if(name.trim() === '' || tel.trim() === ''){alert('Fill in all fields of form please'); return}
        
        const newContact = {name:name, tel:tel, id: nanoid()}
        const newContactExist = this.props.contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
        if(newContactExist){alert(`${name} is already in contacts`)}
        this.props.addContact(newContact)
        this.setState({name: '', tel: ''})
    }

    render (){
        return(
            <div className={styles.contactFormMainDiv}>
                <label htmlFor="name">Name</label>
                <input type="text"
                    name = 'name'
                    placeholder="Enter your name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={this.state.name}
                    onChange={this.nameChange}/>
                
                <label htmlFor="tel">Number:</label>
                <input type="tel" 
                       name="number" 
                       inputMode="numeric"
                       pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                       title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                       required 
                       placeholder="Enter your phone number"
                       value={this.state.tel}
                       onChange={this.telChange}/>
                <button type="button" onClick={this.addNewContact}>Add contact</button>

            </div>
        )

    }
};

ContactForm.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        tel: PropTypes.string.isRequired
      })
    ).isRequired,
    addContact: PropTypes.func.isRequired
  };

export default ContactForm;