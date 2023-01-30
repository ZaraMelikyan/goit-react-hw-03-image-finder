import { Wrapper } from './Loader.styled';
import { ColorRing } from 'react-loader-spinner'


const Loader = () => {
  return (
    <Wrapper>
      <ColorRing
  height="80"
  width="80"
  ariaLabel="blocks-loading" 
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </Wrapper>
  );
};

export default Loader;

