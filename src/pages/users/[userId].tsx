import { useParams } from "react-router-dom";
import { Page } from "../../utils/types";


const UserPage: Page = () => {
  const params = useParams();
  return (
    <div>
      <h1>User {JSON.stringify(params)}</h1>
    </div>
  );
};

export default UserPage;