import { BiXCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { usePdfContext } from "../../context";
import { Button, PageNotFound } from "./NotFound.style";

const NotFound = () => {
  const { theme } = usePdfContext();
  const navigate = useNavigate();

  const handleBackToHomeClick = () => navigate("/");

  return (
    <PageNotFound theme={theme}>
      <BiXCircle /> <h1>Page Not Found</h1>
      <Button onClick={handleBackToHomeClick} role="link">
        Back to Home
      </Button>
    </PageNotFound>
  );
};

export default NotFound;
