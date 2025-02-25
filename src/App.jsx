import './App.css'
import GoogleLogin from './components/GoogleLogin'
import { AuthContext } from './providers/AuthProvider';
import { useContext } from 'react';

function App() {
  const { user } = useContext(AuthContext);
  if(user && user?.email){
    return (
      <div className='text-3xl font-bold'>Welcome to Task Manager App.</div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-5xl font-bold mb-8'>Task Management App</h1>
      <p className='text-lg text-gray-700 py-4'>Login with google to get started.</p>
      <GoogleLogin />
    </div>
  )
}

export default App
