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
              Explore the fascinating world of AI in the first of our
              Experiments. Witness a unique conversation between two advanced AI
              models, ChatGPT and Bard, powered by OpenAI's GPT-3.5 and Google's
              Palm AI APIs respectively. This experiment showcases their ability
              to generate human-like text, providing a glimpse into the future
              of AI applications. If you're interested in creating an ai
              application or are interested in our work at Reshape Creative,{" "}
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
