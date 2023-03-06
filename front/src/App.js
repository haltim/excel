import axios from "axios";
import { React, useState } from "react";
import * as XLSX from 'xlsx';
import "./App.css"


function App() {
  const [data, setData] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [rows, setRows] = useState([]);
  

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
      

        // Generate column headers
     

      // Create a state variable for each row of data
      const rowData = jsonData.map((row, index) => {
        let rowHtml = "";
        Object.values(row).forEach((cell, index) => {
          rowHtml += cell;
          if (index !== Object.values(row).length - 1) {
            rowHtml += "-  ---------  ";
          }
        });
        return (
          <div key={index}>
            <p dangerouslySetInnerHTML={{ __html: rowHtml }}></p>
            <hr />
          </div>
        );
      });
      setRows(rowData);
     

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
    // const joined = prompt +"\n in the table below" + rows;

    e.preventDefault();

    // Send a request to the server with the prompt
    axios
<<<<<<< HEAD
      .post(
        "http://localhost:8080/chat",
        JSON.stringify({ prompt }),
      
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
=======
      .fetch("http://localhost:8080", { prompt })
>>>>>>> 63cbd49d94506cf75666b6ecfa54c007cff7272b
      .then((res) => {
        // Update the response state with the server's response
        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

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
      <p>{response}</p>
      <p>{rows}</p>
   
    </div>
  );
}
export default App;
