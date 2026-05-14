/* eslint-disable react/prop-types */
import { Navbar } from "./Navbar";
import { useRecoilValue } from "recoil";

import { userEmailState } from "../store/selectors/userEmail";

function Appbar({ theme, onToggleTheme }) {
  const userEmail = useRecoilValue(userEmailState);

  return (
    <div>
      <Navbar
        isUserLoggedIn={Boolean(userEmail)}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
    </div>
  );
}

export default Appbar;
