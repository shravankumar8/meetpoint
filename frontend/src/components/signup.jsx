import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { userState } from "../store/atom/user";
import GoogleIcon from "../assets/google.svg";
import { useNavigate } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { useRecoilValue } from "recoil";
import { URL } from "../assets/link";
function Signup() {

  let  setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const [email, setEmail] = useState("kumashravan5@gmail.com");
  const [password, setPassword] = useState("12345");

  return (
    <div>
      <div
        style={{
          paddingTop: 10,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          varint={"outlined"}
          style={{ width: 400, padding: 20, backgroundColor: "#F5F5F5" }}
        >
          <Typography variant={"h4"}>Create your account</Typography>
          <br />
          <br />
          <div
            style={{
              border: "2px solid grey",
              padding: "10px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img style={{ width: "30px" }} src={GoogleIcon}></img>
            <Typography variant={"h6"}>Signup with google</Typography>
          </div>
          <br />
          <br />
          <TextField
            onChange={(evant11) => {
              let elemt = evant11.target;
              setEmail(elemt.value);
            }}
            value={email}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          <br />

          <div style={{ fontSize: "18px" }}>
            Already have an account?
            <span
              onClick={() => {
                navigate("/signin");
              }}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {" "}
              signin
            </span>
          </div>
          <br />
          <br />
          <Button
            style={{ fontSize: "18px", backgroundColor: "black" }}
            size={"large"}
            variant="contained"
            onClick={async () => {
              
              try {
                if (email && password) {
                  const response = await axios.post(
                    `${URL}/signup`,
                    {
                      email: email,
                      password: password,
                    }
                  );
                  let data = response.data;
                  if (response.status == 200) {
                    localStorage.setItem("token", data.token);
                    alert("user created successfully");
                    setUser({
                         isLoading: false,
                      userMail: email,
                    
                    });
                    navigate("/dashboard");
                  } else {
                    throw new Error(response);
                  }
                }
              } catch (error) {
                alert(error.response.data.message);
              }

              // window.location = "/sih";
            }}
          >
            {" "}
            Signup
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
