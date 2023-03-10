import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/index';
import { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render() {
    const { isOpen } = this.state;
    const { largeImageURL, webformatURL, tags } = this.props;

    return (
      <>
        <GalleryItem onClick={this.toggleModal}>
          <GalleryImage src={webformatURL} alt={tags} />
        </GalleryItem>
        {isOpen && (
          <Modal onClose={this.toggleModal} image={largeImageURL} tags={tags} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};

