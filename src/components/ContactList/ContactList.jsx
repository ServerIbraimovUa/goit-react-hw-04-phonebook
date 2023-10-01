import { List } from './ContactList.styled';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map(({ name, id, number }) => {
        return (
          <li key={id}>
            <span>{name}:</span>
            <span>{number}</span>
            <button type="button" onClick={() => onDelete(id)}>
              <RiDeleteBin6Line />
            </button>
          </li>
        );
      })}
    </List>
  );
};

export default ContactList;
