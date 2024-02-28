import React from 'react'
import styles from './styles.module.css'

const ContactList = ({ contacts, handleDelete }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list} >
        {contacts?.map((item) => (
          <li className={styles.item} key={item.id}>
            <p className={styles.text}> {item.name}: {item.number}</p>
            <button
              type="button"
              className={styles.btn}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul >
    </div>
  );
}

export default ContactList;