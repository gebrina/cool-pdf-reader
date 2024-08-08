import { BiXCircle } from "react-icons/bi";
import { usePdfContext } from "../../context";
import { PageNotFound } from "./NotFound.style";

const NotFound = () => {
  const { theme } = usePdfContext();
  return (
    <PageNotFound theme={theme}>
      <BiXCircle /> <h1>Page Not Found</h1>
    </PageNotFound>
  );
};

export default NotFound;
