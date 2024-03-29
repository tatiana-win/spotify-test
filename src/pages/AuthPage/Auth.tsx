import './Auth.css';
import { Logo } from '../../icons/Logo/Logo';
import { useCallback } from 'react';
import { CLIENT_ID, ROOT_ENDPOINT } from '../../config';

const REDIRECT_URI = `${ROOT_ENDPOINT}/authorize`;
const RESPONSE_TYPE = 'code';
const SCOPES = '';
const AUTH_ENDPOINT = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;

export const Auth = () => {
  const handleClick = useCallback(
    () => window.location.replace(AUTH_ENDPOINT),
    [],
  );
  return (
    <div className='auth'>
      <img
        src={process.env.PUBLIC_URL + '/music.gif'}
        alt='logo'
        className='auth-gif'
      />
      <Logo className='auth-logo' fill='#fff' />
      <button
        id='login-button'
        className='button primary auth-button'
        onClick={handleClick}
      >
        Log In{' '}
      </button>
    </div>
  );
};
