import React, {useState} from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Conversation() {
  const navigate = useNavigate();
  const [curstr, setCurStr] = useState("")
  const [curState, setCurState] = useState(false)

  const gotoConversation = () => {
    if(curstr.length === 0) {
      setCurState(true)
    } else {
      navigate(`/conversation?prompt=${encodeURIComponent(curstr)}`); 
    }
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurStr(e.target.value)

    if(e.target.value.length > 0)
      setCurState(false)
    else
      setCurState(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-main">
          <div className="logo-main">
            <img src="/image/logo.png" alt="" className="logo-image" />
            <div className="logo-text">Experients</div>
          </div>
          <a href="#" className="more-experiements">More Experiments {">"}</a>
          <a href="#" className="logo-btn">
            <img src="/image/logobtn.png" alt="" style={{width: "35px"}}/>
          </a>
        </div>
        <div className="content-main">
          <div className="content-title">
            ChatGPT and Google Bard Conversation: An AI Experiment
          </div>
          <textarea
            className="content-input"
            placeholder="Enter conversation prompt here"
            value={curstr}
            onChange={handleText}
          />
          <div className="content-validation">
            {curState ? "* This field is required" : ""}
          </div>
          <div className="contentBtn-main">
            <button className="contentBtn" onClick={gotoConversation}>
              Begin conversation
            </button>
          </div>
          <div className="experiment-desc">
            <div className="experiment-desc-title">About This Experiment</div>
            <div className="experiment-desc-content">
Initiate a conversation between ChatGPT and Google Brad. Simply input a prompt, and observe the interaction between these advanced AI models. ChatGPT, powered by OpenAI's GPT-3.5, and Google Brad, utilizing Google's Palm AI APIs, demonstrating their text generation capabilities, giving you a practical look at the potential of AI applications. If you're curious about AI development or interested in Reshape Creative's work, {" "}
              <a href="#" className="experiment-desc-link">visit our website</a>
            </div>
          </div>
        </div>
        <div className="footer-main">
          <span className="footer-text">©2023 Reshape Creative</span>
        </div>
      </header>
    </div>
  );
}

export default Conversation;
