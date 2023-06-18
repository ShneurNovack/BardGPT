import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./App.css";
import { BACKEND_API_URL } from "./config";

function MainPage() {
  const navigate = useNavigate();
  const [curResults, setCurResults] = useState<any[]>([]);
  const [curState, setCurState] = useState(false)
  const curCount = useRef(0)
  let curGPTResponse = useRef<{values: {role: string, content: string | null}[]}>({values: []});
  let curBardResponse = useRef<{values: {author: string, content: string | null}[]}>({values: []});
  
  // Init GPT and Bard
  const location = useLocation();
  let initStr = new URLSearchParams(location.search).get("prompt");
  let demoStr = "You are currently integrated via api on a Reshape Experiment called 'ChatGPT and Bard Conversation' where you will have a conversation with Google Bard (Bard is Google's LLM). When you send a response to this message it will be answered by Google Bard, meaning Bard will be replacing the user in this conversation, you will be taking to Bard. Please don't prefix your responses with 'Assistant:' or anything else. Remember, you are starting this conversation which means no one will see this prompt which means you should respond as if you are the one starting the conversation, so dont start your first response with 'sure,', 'okay,' etc. Now please initiate the conversation based on the following prompt for your conversation with Google Bard: \n '";
  let firstRequestStr = demoStr + initStr + "'";

  const handleConversation = () => {
    if(curState === false)
      setCurState(true)
    else
      navigate("/");
  };

  useEffect(() => {
    if(curGPTResponse.current.values.length === 0) {
      let initGTPResponse = {role: "system", content: firstRequestStr}
      curGPTResponse.current.values = [...curGPTResponse.current.values, initGTPResponse];
    }
    // if(curBardResponse.current.values.length === 0) {
    //   let initBardResponse = {author: "3", content: firstRequestStr}
    //   curBardResponse.current.values = [...curBardResponse.current.values, initBardResponse];
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(!curState)
      getResult()
  }, [curResults])

  const getResult = async () => {
    let strAPIURL = ""
    if(curCount.current.valueOf() % 2 === 0)
      strAPIURL = BACKEND_API_URL + "/openai";
    else
      strAPIURL = BACKEND_API_URL + "/googlepalm";

    try {
      const requestData = {
        inputStr: curCount.current.valueOf() % 2 === 0 ? curGPTResponse.current.values : curBardResponse.current.values
      }
      const response = await axios.post(strAPIURL, requestData);
      let resultStr = response.data;

      setCurResults(curResults => [...curResults, resultStr]);

      curCount.current += 1;
      let newGTPResponse = {role: curCount.current.valueOf() % 2 === 0 ? "user" : "assistant", content: resultStr}
      curGPTResponse.current.values = [...curGPTResponse.current.values, newGTPResponse];
      let newBardResponse = {author: curCount.current.valueOf() % 2 === 0 ? "1" : "0", content: resultStr}
      curBardResponse.current.values = [...curBardResponse.current.values, newBardResponse];

   
    } catch (error) {
      console.log(error)
    }

    console.log("GPT",    curCount.current, curGPTResponse );
    console.log("Bard", curCount.current, curBardResponse);
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
        <div className="conversation-main">
          <div className="conversation-title">
            <strong>Prompt:</strong>&nbsp;{initStr}
          </div>
          <div className="conversation-content">
            {curResults.map((result, key) => (
              <div className="conversation-gpt" key={key}>
                <div className="conversation-gpt-header">
                  <img src={key % 2 === 0 ? "/image/chatgpt-icon.svg" : "/image/Google_Bard_logo.svg" }  alt="" style={{width: "35px"}}/>
                  <span className="conversation-gpt-title">{key % 2 === 0 ? "ChatGPT" : "Bard" }</span>
                </div>
                <div>
                  <span className="conversation-gpt-content">
                    {result}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="conversationBtn-main">
            {
              curState === false ? 
                <span className="contentBtn-title">{curResults.length % 2 === 0 ? "ChatGPT is Thinking..." : "Bard is Thinking..." }</span>
              : 
              <span className="contentBtn-title"></span>
            }
            <div>
              <button className="conversationBtn" onClick={handleConversation}>
                {curState === false ? "Stop conversation" : "New conversation"}
              </button>
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

export default MainPage;
