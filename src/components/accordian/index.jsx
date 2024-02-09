import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  console.log(`multi selection ${enableMultiSelection}`);

  function handleSingleSelection(getCurrentId) {
    // console.log(getCurrentId);
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMutiple = [...multiple];

    const findIndexOfSelected = cpyMutiple.indexOf(getCurrentId);

    if (findIndexOfSelected === -1) {
      cpyMutiple.push(getCurrentId);
    } else {
      cpyMutiple.splice(findIndexOfSelected, 1);
    }

    setMultiple(cpyMutiple);
  }

  console.log(selected, multiple);

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        {enableMultiSelection ? "Disable" : "Enable"} Multi Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
                {selected === dataItem.id ||
                multiple.indexOf(dataItem.id) !== -1 ? (
                  <div className="content">
                    <br />
                    {dataItem.answer}
                  </div>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <div>NO data found !!</div>
        )}
      </div>
    </div>
  );
}
