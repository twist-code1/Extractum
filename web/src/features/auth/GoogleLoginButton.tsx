import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from './AuthContext.tsx';

export function GoogleLoginButton() {
  const { loginWithGoogle } = useAuth();

  return (
    <GoogleLogin
      onSuccess={(res) => {
        if (res.credential) {
          loginWithGoogle(res.credential);
        }
      }}
      onError={() => console.error('Login Failed')}
      theme="outline"
      size="large"
      shape="rectangular"
      text="signin_with"
    />
  );
}