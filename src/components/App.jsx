import { Component } from 'react';
import { Button, ImageGallery, Loader, Searchbar } from 'components/index';
import { getImages } from 'services/ApiService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 0,
    lastPage: 0,
    status: 'idle',
  }

  async componentDidUpdate(_, prevState) {

    const { query, page } = this.state;

    if (prevState.page !== page && page !== 1) {
      this.setState({ status: 'pending' });
      this.loadMore(query, page);
    }

    if (prevState.query !== query && query !== "") {
      this.setState({ status: 'pending' });
      this.makeNewFetch(query, page)
    }
  }

  //async componentDidUpdate(_, prevState) {

  //  const { query, page } = this.state;

  //  if (prevState.page !== page && page !== 1) {
  //    this.setState({ status: 'pending' });
  //    this.loadMore(query,page);
  //  }

  //  if (prevState.query !== query && query !== "") {
  //    this.setState({ status: 'pending' });
  //    this.makeNewFetch(query, page)
  //  }
  // }


  makeNewFetch = async (newQuery, page) => {
    try {
      const response = await getImages(newQuery, page);
      const { totalHits, hits } = response;

      if (totalHits === 0) {
        this.setState({ lastPage: 1, status: 'rejected' });
        Notify.failure('Sorry, there are no images matching your search request. Please try another request.');
        return;
      }

      const lastPage = Math.ceil(totalHits / 12);
      this.setState({ lastPage, images: hits, status: 'resolved' });
      Notify.success(`Hurray! ${totalHits} images found`);

    } catch (error) {
      this.setState({ status: 'rejected' });
      console.log(error.message);
    }
  }
  

  loadMore = async (query, page) => {
    try {
      const response = await getImages(query, page);
      this.setState(({ images }) => ({ images: [...images, ...response.hits], status: 'resolved' }));
      setTimeout(() => this.scroll(), 100);

    } catch (error) {
      this.setState({ status: 'rejected' });
      console.log(error.message);
    }
  }

  


  onSubmit = async (query) => {
    const page = 1;

    this.setState({
      query: query,
      page,
      images: [],
      status: 'pending'
    });

  }

  //onSubmit = async evt => {
  //  evt.preventDefault();
  //  const input = evt.target.elements.search;
  //  const value = input.value.trim();
  //  const page = 1;

    
  //   this.setState({ loading: true });
  //   const res = await getImages(value, page);
  //  this.setState({ loading: false });

  //  if (res.hits.length === 0) {
  //    Notify.failure(
  //      'Sorry, there are no images matching your search query. Please try again.'
  //    );
  //    return;
  //   }

  //  const totalPages = Math.ceil(res.totalHits / 12);

  //  this.setState({
  //    images: res.hits,
  //    query: value,
  //    page,
  //    totalPages: totalPages,
  //  });
  // };


  handleBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1, }));
  }

  scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  };

  render() {
  
    const { images, page, lastPage, status } = this.state;
   

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} isSubmitting={status === 'pending'} />
        {images.length > 0 && <ImageGallery images={images} />}
        {status === 'pending'
          ? (<Loader />)
          : page !== lastPage && (<Button onClick={this.handleBtnClick} />)}
      </>
    );
  }
}