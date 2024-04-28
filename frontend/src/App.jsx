import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/landingpage";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Appbar from "./components/Appbar";
import Dashboard from "./components/Dashboard";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userState } from "./store/atom/user";
import axios from "axios";
import InitUser from "./components/initUser";
import ChatRoom from "./components/Chatroom";
import Textroom from "./components/Textroom";
import VideoChat from "./components/VideoChat";
import {FinalVideoChat} from "./components/FinalVideoChat";
import About from "./components/About";
import Features from "./components/Features";
import HowItWorks from "./components/Howitworks";
import Stream from "./components/Stream";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <InitUser />
        <Appbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatroom/:roomId" element={<Textroom />} />
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/videochat" element={<VideoChat />} />
          <Route path="/videochat/:roomId" element={<FinalVideoChat />} />
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="howitworks" element={<HowItWorks />} />
          <Route path="stream" element={<Stream />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
