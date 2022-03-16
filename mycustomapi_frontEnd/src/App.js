import React, { useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
import "./App.css";
import content from './Utils/content.json'
import * as actions from './Redux/actions/action'
import HasJsonStructure from './Components/HasJsonStructure'
import CopyToClipboard from './Components/CopyToClipboard'

function App() {
  const ipResponse = useSelector((state)=> state.ipResponse);
  const secretID = useSelector((state) => state.secretID);
  const preInput = useSelector((state) => state.preInput);

  const dispatch = useDispatch();
  const [warning, setWarning] = useState();

  const update = preInput
    ? `${content.baseUrl}/update/${secretID}`
    : "Edit above response to generate Api"

  const fetchResult = () => {
    //error handler and warnings
    if (!ipResponse) return setWarning(" * Response can't be empty");
    if (ipResponse === preInput) return setWarning(" * Api for above data is already constructed and displayed below");
    if (!HasJsonStructure(ipResponse)) return setWarning(" * check data with valid JSON object");

    //create new api and clear warning
    setWarning(" ");
    dispatch(actions.createApi(ipResponse))

  };

  return (
    <div>
      <nav
        className="navbar navbar-light bg-light"
        style={{ paddingLeft: "10%" }}
      >
        <div>
          <h1 className="navbar-brand" href="#">
          {content.appName}
          </h1>
        </div>
      </nav>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10%",
          backgroundColor: "rgb(169, 212, 212)",
        }}
      >
        <h1 className="text-6xl mb-two bold" style={{ paddingBottom: "20px" }}>
          Generate{"  {your own JSON}"} 
        </h1>
        <p className="mb-one text-lg">
          Free to use online REST API's for testing and prototyping
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10%",
          backgroundColor: "rgb(240, 243, 243)",
        }}
      >
        <h5 className="text-6xl mb-two bold" style={{ marginBottom: "15px" }}>
          Edit below reponse to generate Api
        </h5>
        <div className="form-floating">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Response
            </span>
            <textarea
              id="defaultInput"
              spellCheck="false"
              className="form-control"
              placeholder="//provide response data object here"
              style={{ height: "130px" }}
              onChange={(e) => dispatch({type:"UPDATE_INPUT",payload:(e.target.value)})}
              value={ipResponse}
            ></textarea>
          </div>
          <button
            onClick={fetchResult}
            className="btn btn-primary"
            style={{ marginBottom: "15px", width: "130px" }}
          >
            Generate Api
          </button>
          <span id="warning" style={{ color: "red" }}>
            {warning}
          </span>
          <p style={{ marginBottom: "15px" }}>
            Run below api to get above response
          </p>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Read
            </span>
            <textarea disabled
              spellCheck="false"
              className="form-control"
              id="read"
              style={{ height: "100px" }}
              value={
                `fetch("${content.baseUrl}/read/${secretID}")
              .then(response => response.json())
              .then(json => console.log(json))`}
            >
            </textarea>
            <button  onClick={()=>CopyToClipboard('read')} className="btn btn-secondary btn-sm" style={{position: "absolute", right: "0px", top: "0px" }} > copy</button>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Update
            </span>
            <textarea disabled
              spellCheck="false"
              className="form-control"
              id="update"
              style={{ height: "160px" }}
              value={
                `fetch('${update}', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({"name":"Shyam","email":"shyamjaiswal@gmail.com"})})
                .then(response => response.json())
                .then(json => console.log(json))`}
            >
            </textarea>
            <button  onClick={()=>CopyToClipboard('update')} className="btn btn-secondary btn-sm" style={{position: "absolute", right: "0px", top: "0px" }} > copy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;