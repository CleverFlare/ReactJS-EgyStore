import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import Container from "../components/Container";

const SignIn = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <>
      <TopNav />
      <Container>
        <div className="test">
          <p>Login</p>
          <button onClick={handleGoBack}>back</button>
        </div>
      </Container>
    </>
  );
};

export default SignIn;
