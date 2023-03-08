import axios from "axios";

import { React, useState } from "react";

import * as XLSX from 'xlsx';

import "./App.css"

function App() {

  const [data, setData] = useState([]);

  const [prompt, setPrompt] = useState("");

  let jsonData = null;

  const handleFile = (file) => {

    const reader = new FileReader();

    const rABS = !!reader.readAsBinaryString;

    reader.onload = async (e) => {

      const bstr = e.target.result;

      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

      const wsname = wb.SheetNames[0];

      const ws = wb.Sheets[wsname];

      jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      setData(jsonData.slice(0, 11));    

    };

    if (rABS) reader.readAsBinaryString(file);

    else reader.readAsArrayBuffer(file);

  };

  const handleButtonClick = () => {

    document.getElementById("input-file").click();

  }

  const handleInputChange = (e) => {

    const file = e.target.files[0];

    handleFile(file);

  };

  const handleSubmit = (e) => {

    e.preventDefault();

  };

  return (

    <div className="container">

      <h1>Upload Excel File</h1>

      <input type="file" id="input-file" accept=".xlsx, .xls" onChange={handleInputChange} style={{ display: "none" }} />

      <button onClick={handleButtonClick}>Choose File</button>

      {data.length > 0 &&

        <table className="table">

          <thead>

            <tr>

              {data[0] &&

                data[0].map((header, index) => <th key={index}>{header}</th>)}

            </tr>

          </thead>

          <tbody>

            {data.slice(1).map((row, index) => (

              <tr key={index}>

                {row.map((cell, index) => (

                  <td key={index}>{cell}</td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      }

      {data.length > 0 &&

        <form onSubmit={handleSubmit}>

          <label htmlFor="input">Enter your related questions:</label>

          <input

            type="text"

            value={prompt}

            onChange={(e) => setPrompt(e.target.value)}

          />

          <button type="submit">Submit</button>

        </form>

      }

    </div>

  );

}

export default App;
