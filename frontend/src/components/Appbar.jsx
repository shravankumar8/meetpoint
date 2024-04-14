

import { Navbar } from "./Navbar";
import { useRecoilValue } from "recoil";

import { userEmailState } from "../store/selectors/userEmail";


function Appbar() {
 
  const userEmail = useRecoilValue(userEmailState);


 

  // const [userEmail, setUserEmail] = useState("");


  if (userEmail) {

    return (
      <div>
        
        <Navbar isUserLoggedIn={true} />
      </div>
    );
  } else {
    return (
      <div>
        
        <Navbar isUserLoggedIn={false} />
      </div>
    );
  }
}

export default Appbar;
