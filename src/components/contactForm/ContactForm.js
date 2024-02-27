import { Component } from 'react'
import styles from './styles.module.css'

class ContactForm extends Component {
  state = {
    name: '',
    number: ''
  }

  handleChange = (evt) => {
    const { name, value } = evt.target
    this.setState((prev) => ({ ...prev, [name]: value }))
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.createNewContact(this.state)
    this.formReset()
  }

  formReset = () => {
    this.setState({ name: '', number: '' })
  }

  render() {
    return (
      <form className={styles.form} id='contactForm' onSubmit={this.handleSubmit}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="name">Name</label>
          <input
            className={styles.input}
            name="name"
            value={this.state.name}
            type="text"
            id="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. 
        For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="number">Number</label>
          <input
            className={styles.input}
            name="number"
            value={this.state.number}
            type="tel"
            id="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
          />
        </div>
        <button
          className={styles.button}
          type='submit'
          htmlFor='contactForm'>
          Add contact
        </button>
      </form>
    );
  }

}

export default ContactForm;