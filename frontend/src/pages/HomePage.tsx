import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";

const HomePage = () => {
  const nav = useNavigate();

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Button onClick={() => nav("/apple-game")} text="게임 시작" />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
