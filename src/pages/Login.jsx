import GoogleLogin from './../components/GoogleLogin';

const Login = () => {

  return (
    <div className='flex flex-col items-center justify-center h-screen px-3'>
      <h1 className='text-3xl sm:text-5xl font-bold mb-8 text-center text-gray-800'>Task Management App</h1>
      <p className='text-lg text-gray-700 py-4 text-center'>Login with google to get started.</p>
      <GoogleLogin />
    </div>
  );
};

export default Login;