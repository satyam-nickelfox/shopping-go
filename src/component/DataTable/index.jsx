import React, { useState } from "react";

const DataTable = ({ data, columns, pageSize }) => {

  // Filter data based on search term
  const filteredData = data.filter((item) => item);

  return (
    <div>
      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="p-4 text-left">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className="p-4">
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default DataTable;
