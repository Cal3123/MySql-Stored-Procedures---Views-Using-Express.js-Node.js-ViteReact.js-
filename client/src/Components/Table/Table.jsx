import React from "react";

function Table({
  list,
  colNames,
  width = "auto",
  height = "auto",
}) {
  const row = colNames.length > 0 ? colNames: {};
  //console.log(list)
  return (
    <div style={{ width, boxShadow: "px 6px 3px #ccc" }}>
      {list.length > 0 && (
        <table
          cellSpacing="0"
          style={{   margin:"30px", padding: "5px 10px" }}
        >
          <thead style={{ backgroundColor: "black", color: "white" }}>
            <tr>
              
              { row.length > 0 &&
              row.map((headerItem, index) => (
                <th style={{  width: "auto", height: "auto", padding: "5px 10px" }} key={index}> {headerItem.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(list).map((obj, index) => (
              <tr style={{  width: "100%", height: "100%", padding: "5px 10px" }} key={index}>
                {Object.values(obj).map((value, index2) => (
                  <td key={index2}>{value? value : "null"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;