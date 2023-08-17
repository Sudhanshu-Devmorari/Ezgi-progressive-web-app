import React from 'react';
import SocialButton from 'reactjs-social-login';
import google from './google.png'; // Assuming you have the Google logo image

const GoogleLoginButton = ({ onSuccess, onFailure }) => (
  <SocialButton
    provider="google"
    appId="YOUR_GOOGLE_CLIENT_ID"
    onLoginSuccess={onSuccess}
    onLoginFailure={onFailure}
  >
    <img className="mx-3" src={google} alt="" height={50} />
  </SocialButton>
);

export default GoogleLoginButton;
