import React from 'react'
import styles from './styles.module.css'

const ContactList = ({ contacts, handleDelete, handleEdit }) => {
  return (
    <div className={styles.container}>
      {contacts ?
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
        : null}
    </div>
  );
}

export default ContactList;