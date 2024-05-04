import React, { useState } from "react";
import BackArrow from "../BackArrow";

import "./index.css";

// const DisplayValues = ({ elements }) => {
//     const displayElem = []
//   for (const [key, value] of Object.entries(elements)) {
//     console.log(`${key}: ${value}`);
//     displayElem.push(
//       <div>
//         <span>{key}</span>
//         <span>{value}</span>
//       </div>
//     );
//   }
//   return (
//     <div>
//         {displayElem.map((entry)=> entry)}
//     </div>
//   )
// };

/* eslint-disable react/prop-types */
const ConnectWidget = ({ className }) => {
  const [step, setStep] = useState(0);

  const [urlDb, setUrlDb] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [currentSchema, setCurrentSchema] = useState("");
  const [timeLines, setTimeLines] = useState([]);
  const [selectedTime, setSelectedTime] = useState({});

  const getSchema = async () => {
    if (!urlDb) return;
    try {
      const req = await fetch(urlDb, {
        method: "GET",
      });
      const res = await req.json();
      setSchemas(res);
      setStep(1);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getListTimeLines = async (schema) => {
    if (!urlDb || !schema) return;
    setCurrentSchema(schema);
    try {
      const req = await fetch(`${urlDb}?schema=${schema}/`, {
        method: "GET",
      });
      const res = await req.json();
      setTimeLines(res);
      setStep(2);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getTimeLine = async (timeLine, format = "string") => {
    if (!urlDb || !currentSchema || !timeLine) return;
    try {
      console.log(currentSchema);
      console.log(timeLine);
      const req = await fetch(
        `${urlDb}?schema=${currentSchema}&timeLine=${timeLine}&format=${format}`,
        {
          method: "GET",
        }
      );
      const res = await req.json();
      setSelectedTime({ timeLine, ...res[0] });
      setStep(3);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={className}>
      {step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>Connect to your databese </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              placeholder="enter url address"
              type="text"
              value={urlDb}
              onChange={(e) => setUrlDb(e.target.value)}
            />
            <button onClick={getSchema}>Connect</button>
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="">
          <div className="components-header">
            <BackArrow
              className={"back-button"}
              onClick={() => setStep((prev) => prev - 1)}
            />
            <div>Database schemas</div>
          </div>
          <div className="schemas-cont">
            {schemas.map((entry, key) => (
              <div
                className="schema-element"
                key={key}
                onClick={(e) => getListTimeLines(e.target.innerText)}
              >
                {entry}
              </div>
            ))}
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="widget-cont">
          <div className="components-header">
            <BackArrow
              className={"back-button"}
              onClick={() => setStep((prev) => prev - 1)}
            />
            <div>Time lines</div>
          </div>
          <div className="timelines-cont">
            {timeLines.map((entry, key) => (
              <div
                className="schema-element"
                key={key}
                onClick={(e) => getTimeLine(e.target.innerText)}
              >
                {entry}
              </div>
            ))}
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="widget-cont">
          <div className="components-header">
            <BackArrow
              className={"back-button"}
              onClick={() => setStep((prev) => prev - 1)}
            />
            <div>{selectedTime.timeLine}</div>
          </div>
          <div className="timelines-cont">
            <div>Time: {selectedTime.time}</div>
            <div>Value: {selectedTime.value}</div>
            {/* <div>
              Value:
              <DisplayValues elements={JSON.parse(selectedTime.value)} />
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWidget;
