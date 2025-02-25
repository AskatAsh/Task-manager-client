import GoogleLogin from './../components/GoogleLogin';

const Login = () => {

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-5xl font-bold mb-8'>Task Management App</h1>
      <p className='text-lg text-gray-700 py-4'>Login with google to get started.</p>
      <GoogleLogin />
    </div>
  );
};

export default Login;