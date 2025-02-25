import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { googleSignIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await googleSignIn();
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/tasks");
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleLogin}
        className="bg-purple-500 text-white px-8 py-3 rounded-md block mx-auto active:scale-95"
      >
        Get started with google
      </button>
    </>
  );
};

export default GoogleLogin;
