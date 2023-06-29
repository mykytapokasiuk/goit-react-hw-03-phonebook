import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export default class ContactForm extends Component {
  contactNameId = nanoid();
  contactNumberId = nanoid();

  state = {
    ...INITIAL_STATE,
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddContact({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className={css.contactForm}>
          <label htmlFor={this.contactNameId}>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={this.state.name}
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            id={this.contactNameId}
            onChange={this.handleChange}
            required
          />
          <label htmlFor={this.contactNumberId}>Number</label>
          <input
            type="tel"
            name="number"
            placeholder="Enter your phone"
            value={this.state.number}
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            id={this.contactNumberId}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Add contact</button>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
