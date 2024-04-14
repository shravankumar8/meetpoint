import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { userState } from "../store/atom/user";
  import { useNavigate } from "react-router-dom";
 import { RecoilRoot, useSetRecoilState,useRecoilValue } from "recoil";
 import { userEmailState } from "../store/selectors/userEmail";
import GoogleIcon from "../assets/google.svg";
import { URL } from "../assets/link";
function Signin() {
   let  setUser = useSetRecoilState(userState);
   const navigate = useNavigate();
  const [email, setEmail] = useState("kumashravan5@gmail.com");
  const [password, setPassword] = useState("12345");
const  userEmail = useRecoilValue(userEmailState);
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
            <Typography variant={"h6"}>Signin with google</Typography>
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

            fullWidth={true}
            label="Password"
            variant="outlined"
            value={password}
            type={"password"}
          />
          <br />
          <br />
          <br />

          <div style={{ fontSize: "18px" }}>
            New User?
            <span onClick={()=>{;navigate("/signup")}} style={{ color: "blue", cursor: "pointer" }}> Signup</span>
          </div>
          <br />
          <br />
          <Button
            style={{ fontSize: "18px", backgroundColor: "black" }}
            size={"large"}
            variant="contained"
            onClick={async () => {
          //  const userEmail = useRecoilValue(userEmailState);
              try {
                if (email && password) {
                  const response = await axios.get(
                    `${URL}/login`,
                    {headers:{
                      email: email,
                      password: password,

                    }
                    }
                  );
                  console.log(userEmail,email);
                  let data = response.data;
                  if (response.status == 200) {
                  
                    localStorage.setItem("token", data.token);
                   await setUser({
                      isLoading: false,
                      userMail: email,
                    });
                    console.log(userEmail,email);
                    
                  
                    alert("user logged in  successfully");
                     navigate("/dashboard")
                   
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
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
