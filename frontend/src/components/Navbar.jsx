import logoImage from "../assets/logo.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atom/user";
import { RecoilRoot, useSetRecoilState } from "recoil";

export function Navbar(props) {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  if (props.isUserLoggedIn) {
    return (
      
      <div
        style={{
          display: "flex",
          

          zIndex: 1,
          backgroundColor: "#F5F5F5",
          height: "55px ",
          padding: "0px 58px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            style={{
              display: "flex",

              alignItems: "center",
              height: "100%",
              width: "200px",
            }}
            src={logoImage}
            alt=""
          />
        </div>

        <div>
          <ul
            style={{
              display: "flex",
              listStyleType: "none",
              alignItems: "center",
              gap: "45px",
            }}
          >
            <li
              onClick={() => {
                navigate("dashboard");
              }}
              style={{ fontSize: "18px", cursor: "pointer" }}
            >
              Home{" "}
            </li>
            <li
              onClick={() => {
                navigate("about");
              }}
              style={{ fontSize: "18px", cursor: "pointer" }}
            >
              About
            </li>
            <li
              onClick={() => {
                navigate("features");
              }}
              style={{ fontSize: "18px", cursor: "pointer" }}
            >
              Features
            </li>
            <li
              onClick={() => {
                navigate("howitworks");
              }}
              style={{ fontSize: "18px", cursor: "pointer" }}
            >
              How it works
            </li>
            <Button
              onClick={() => {
                localStorage.setItem("token", null);
                window.location.reload();
                navigate("/");
                setUser({
                  isLoading: false,
                  userMail: null,
                  userName: null,
                });
                props.isUserLoggedIn = false;
              }}
              style={{ backgroundColor: "black", fontSize: "18px" }}
              variant="contained"
            >
              logout
            </Button>
          </ul>
        </div>
      </div>
    );
  } else {
    // return <div>are</div>;
    return (
      <div
        style={{
          display: "flex",

          zIndex: 1,
          backgroundColor: "#F5F5F5",
          height: "55px ",
          padding: "0 58px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            style={{
              display: "flex",

              alignItems: "center",
              height: "100%",
              width: "200px",
            }}
            src={logoImage}
            alt=""
          />
        </div>

        <div>
          <ul
            style={{
              display: "flex",
              listStyleType: "none",
              alignItems: "center",
              gap: "45px",
            }}
          >
            <li
              onClick={() => navigate("/")}
              style={{ fontSize: "18px", cursor: "pointer" }}
            >
              Home{" "}
            </li>
            <li
              onClick={() => navigate("about")}
              style={{ fontSize: "18px", cursor: "pointer" }}
            >
              About
            </li>
            <li
              onClick={() => navigate("features")}
              style={{ fontSize: "18px", cursor: "pointer" }}
            >
              Features
            </li>
            <li
              onClick={() => navigate("howitworks")}
              style={{ fontSize: "18px", cursor: "pointer" }}
            >
              How it works
            </li>
            <Button
              onClick={() => {
                // Remove token instead of setting to null
                navigate("/signup"); // Navigate to login page or wherever appropriate

              
              }}
              style={{ backgroundColor: "black", fontSize: "18px" }}
              variant="contained"
            >
              Get started
            </Button>
          </ul>
        </div>
      </div>
    );
  }
}
