import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const GoogleLogin = () => {
  const { user, setUser, googleSignIn } = useContext(AuthContext);

  const handleLogin = async () => {
    const result = await googleSignIn();

    if (result.user?.email) {
      console.log(result?.user);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogin}
        className="bg-purple-500 text-white px-8 py-3 rounded-md block mx-auto active:scale-95"
      >
        Get started with google
      </button>
    </div>
  );
};

export default GoogleLogin;
