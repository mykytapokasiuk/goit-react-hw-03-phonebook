import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';

const ContactListItem = ({ name, number, contactId, onRemoveContact }) => {
  return (
    <li className={css.listItem}>
      {name}: {number}
      <button
        className={css.listItemBtn}
        type="button"
        onClick={() => onRemoveContact(contactId)}
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};

export default ContactListItem;
