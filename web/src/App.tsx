import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { GoogleLoginButton } from './features/auth/GoogleLoginButton';

function MainContent() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) return <div>Загрузка...</div>;

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Extractum</h1>
        <GoogleLoginButton />
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <p>Вошёл как: {user.name || user.email}</p>
      <button onClick={logout}>Выйти</button>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}