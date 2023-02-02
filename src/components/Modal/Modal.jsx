import { Image, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = evt => {
    if (evt.code !== 'Escape') {
      return;
    }
    this.props.onClose();
  };

  clickOnBackdrop = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image, tags } = this.props;

    return createPortal(
      <Overlay onClick={this.clickOnBackdrop}>
        <div>
          <Image src={image} alt={tags} />
        </div>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  image: PropTypes.string,
  tags: PropTypes.string,
};