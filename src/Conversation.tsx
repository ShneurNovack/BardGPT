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

  const handleConversation = () => {
    if(curState === false)
      setCurState(true)
    else
      navigate("/");
  };

  useEffect(() => {
    if(curGPTResponse.current.values.length === 0) {
      let initGTPResponse = {role: "assistant", content: initStr}
      curGPTResponse.current.values = [...curGPTResponse.current.values, initGTPResponse];
    }
    if(curBardResponse.current.values.length === 0) {
      let initBardResponse = {author: "1", content: initStr}
      curBardResponse.current.values = [...curBardResponse.current.values, initBardResponse];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(!curState)
      getResult()
  }, [curResults])

  const getResult = async () => {
    console.log("===============State==========================")
    console.log(curState)

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
      if (((resultStr.toLowerCase().includes('okay') && resultStr.toLowerCase().indexOf('okay') === 0) || 
              resultStr.toLowerCase().includes('sure')) && resultStr.toLowerCase().indexOf('sure') === 0) {
          let updateStr = resultStr.slice(5);

          console.log("Contain=========================")
          let newGTPResponse = {role: curCount.current.valueOf() % 2 === 0 ? "assistant" : "user", content: updateStr}
          curGPTResponse.current.values = [...curGPTResponse.current.values, newGTPResponse];
          let newBardResponse = {author: curCount.current.valueOf() % 2 === 0 ? "1" : "2", content: updateStr}
          curBardResponse.current.values = [...curBardResponse.current.values, newBardResponse];
      } else {
        console.log("No--=-----------Contain=========================")
          let newGTPResponse = {role: curCount.current.valueOf() % 2 === 0 ? "assistant" : "user", content: resultStr}
          curGPTResponse.current.values = [...curGPTResponse.current.values, newGTPResponse];
          let newBardResponse = {author: curCount.current.valueOf() % 2 === 0 ? "1" : "2", content: resultStr}
          curBardResponse.current.values = [...curBardResponse.current.values, newBardResponse];
      }

      console.log(curGPTResponse)
      console.log(curBardResponse)
    } catch (error) {
      console.log(error)
    }
  }

  console.log("Conversation===============")
  console.log(curState)

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-main">
          <div className="logo-main">
            <img src="/image/logo.png" alt="" className="logo-image" />
            <div className="logo-text">Experients</div>
          </div>
          <div className="more-experiements">More Experiments {">"}</div>
          <div className="logo-btn">
            <img src="/image/logobtn.png" alt="" />
          </div>
        </div>
        <div className="conversation-main">
          <div className="conversation-title">
            <strong>Prompt:</strong>&nbsp;{initStr}
          </div>
          <div className="conversation-content">
            {curResults.map((result, key) => (
              <div className="conversation-gpt" key={key}>
                <div className="conversation-gpt-header">
                  <img src={key % 2 === 0 ? "/image/chatgpt-icon.svg" : "/image/Google_Bard_logo.svg" }  alt="" />
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
