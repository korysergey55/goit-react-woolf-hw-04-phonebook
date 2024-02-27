import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { ToastContainer, toast } from 'react-toastify';

import styles from './styles.module.css'

import ContactForm from '../contactForm/ContactForm';
import ContactList from 'components/contactList/ContactList';
import Filter from 'components/filter/Filter';

const INITIAL_STATE = [{ id: "id-1", name: "Rosie Simpson", number: "459-12-56" }]

const App = () => {
  const [contacts, setContacts] = useState(INITIAL_STATE)
  const [filter, setFilter] = useState('')


  useEffect(() => {
    const LOCAL_DATA = localStorage.getItem('contacts')
    if (LOCAL_DATA) {
      setContacts(JSON.parse(LOCAL_DATA))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])


  const isNotDublicate = (data) => {
    if (contacts.some((contact) => contact.name === data.name)) {
      toast.error(`This Name - ${data.name} already exist!`, {
        theme: 'colored',
      })
      return false;
    }
    if (contacts.some((contact) => contact.number === data.number)) {
      toast.error(`This Number - ${data.number} already exist!`, {
        theme: 'colored',
      })
      return false;
    }
    return true
  }

  const createNewContact = (data) => {
    if (!isNotDublicate(data)) return
    const newContact = {
      ...data,
      id: nanoid()
    }
    setContacts((prev) => ([...prev, newContact]))
    setFilter('')
  }

  const handleFilter = (evt) => {
    setFilter(evt.target.value)
  }

  const handleDelete = (id) => {
    setContacts(contacts.filter((item) => item.id !== id))
  }

  const getFilteredContacts = () => {
    return contacts?.filter((item) =>
      item.name
        .toLocaleLowerCase()
        .trim()
        .includes(filter.toLocaleLowerCase().trim()))
  }


  const filteredComtacts = getFilteredContacts()

  return (
    <div className={styles.container} >

      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm
        createNewContact={createNewContact}
      />

      <h1 className={styles.title}>Contacts</h1>
      <Filter
        filter={filter}
        handleFilter={handleFilter} />

      <ContactList
        contacts={filteredComtacts}
        handleDelete={handleDelete}
      />

      <ToastContainer
        position="top-right"
        autoClose={6000}
      />
    </div>
  );
};
export { App }
