import { Component } from 'react'
import { nanoid } from 'nanoid'
import { ToastContainer, toast } from 'react-toastify';

import styles from './styles.module.css'

import ContactForm from '../contactForm/ContactForm';
import ContactList from 'components/contactList/ContactList';
import Filter from 'components/filter/Filter';


class App extends Component {

  state = {
    contacts: [{ id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    ],
    filter: '',
  }

  componentDidMount() {
    const localData = localStorage.getItem('contacts')
    if (localData) {
      this.setState({ contacts: JSON.parse(localData) })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  createNewContact = (data) => {
    if (!this.isNotDublicate(data)) return
    const newContact = {
      ...data,
      id: nanoid()
    }
    this.setState((prev) => ({ ...prev, contacts: [...prev.contacts, newContact] }))
  }

  isNotDublicate = (data) => {
    if (this.state.contacts.some((contact) => contact.name === data.name)) {
      toast.error(`This Name - ${data.name} already exist!`, {
        theme: 'colored',
      })
      return false;
    }
    if (this.state.contacts.some((contact) => contact.number === data.number)) {
      toast.error(`This Number - ${data.number} already exist!`, {
        theme: 'colored',
      })
      return false;
    }
    return true
  }

  handleFilter = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleDelete = (id) => {
    this.setState((prev) => ({
      prev, contacts: prev.contacts.filter((item) => item.id !== id)
    }))
  }

  getFilteredContacts = () => {
    return this.state.contacts.filter((item) =>
      item.name
        .toLocaleLowerCase()
        .trim()
        .includes(this.state.filter.toLocaleLowerCase().trim()))
  }

  render() {
    const filteredComtacts = this.getFilteredContacts()

    return (
      <div className={styles.container} >

        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm
          createNewContact={this.createNewContact}
        />

        <h1 className={styles.title}>Contacts</h1>
        <Filter
          filter={this.state.filter}
          handleFilter={this.handleFilter} />

        <ContactList
          contacts={filteredComtacts}
          handleDelete={this.handleDelete}
        />

        <ToastContainer
          position="top-right"
          autoClose={6000}
        />
      </div>
    );
  }
};
export { App }
