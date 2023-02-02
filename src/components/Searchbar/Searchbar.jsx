import { Component } from 'react';
import { Header, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//const Searchbar = ({ onSubmit, isSubmitting }) => {
class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputValue = e => {
    const value = e.currentTarget.value;
    this.setState({
      query: value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();   

    if (this.state.query.trim() === '') {
      Notify.failure('Please enter a valid request');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <AiOutlineSearch size="26px" />
            <SearchFormButtonLabel></SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoFocus
            autoComplete="off"
            placeholder="Search images and photos"
            name="search"
            onChange={this.handleInputValue}
          />
        </SearchForm>
      </Header>
    );
  };
}
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};