import { Component } from "react"
import PropTypes from 'prop-types';

import styles from './ContactForm.module.css'

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    // isExist: false,
  }
  
  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
    // console.log(target.value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const { contacts } = this.props;
    const isExist = contacts.find(contact => contact.name === name);

  if (isExist) {
    alert(`${name} is already in contacts.`);
    this.setState({
      name: '',
      number: ''
    });
    return;
  }
    this.props.addUserContact({
      // name: this.state.name,
      // number: this.state.number,
      name,
      number,
    })
    
    this.setState({
      name: '',
      number: ''
    });
  }

  render() {

    return (
      <>
        <form className={styles.contactForm} onSubmit={this.handleSubmit}>
          <label className={styles.formLabel}>
            Name
            <input className={styles.formInput}
              type="text"
              name="name"
              // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label className={styles.formLabel}>
            Number
            <input className={styles.formInput}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={this.state.number}
              onChange={this.handleChange}
            />
          </label>
          <button className={styles.formAddBtn} type="submit">Add contact </button>
        </form>
      </>
    )
  }
}

ContactForm.propTypes ={
  addUserContact: PropTypes.func.isRequired,
}