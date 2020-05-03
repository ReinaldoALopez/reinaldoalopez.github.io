import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas'


// import logo from './logo.svg';
// import './css/elements.less';
import './App.css';
import './css/normalize.css';
import './css/resume.css';
// import './css/screen.css';
import './css/pdf.css';

import resume from './resume.md'
console.log(resume);


const ReactMarkdown = require('react-markdown'); // require('react-markdown/with-html')  -> escapeHtml={false}

function convertHtmlToPdf(e) {
  const printArea = window.document.getElementById('mycv');// TagName("body")[0];
  printArea.style.maxWidth = "800px";
  html2canvas(printArea)
  .then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    printArea.style.maxWidth = "";
    const pdf = new jsPDF('p','pt','letter');
    pdf.addImage(imgData, 'JPEG', 0, 0, 600, 0);
    pdf.save("resume.pdf");
    // pdf.output("dataurlnewwindow");

  })  

}

function App() {
 
  const [data, setMarkdown] = useState({ markdown: '# sample'});

  useEffect( () => {
    async function fetchData() {
      const result = await axios(resume,);
      console.log(result);
      setMarkdown({ markdown: result.data });
    }
    fetchData();
  },[]);
 

  console.log(data);
  return (    
    <div className="App">
      <div id="ignorePDF">
        <button onClick={() => convertHtmlToPdf()} >Download PDF</button>
      </div>      
      <div id="mycv">
        <ReactMarkdown source={data.markdown} />
      </div>      
    </div>
  );
}

export default App;
