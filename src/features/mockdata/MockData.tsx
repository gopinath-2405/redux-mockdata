/** @format */

import React from "react";
import { useDeleteDetailMutation, useGetAllDataQuery } from "./mockDataAPI";
import type { GetAllDataResponse } from "./mockDataAPI";
import _ from "lodash";
import './mockdata.css'

const MockData = () => {
  const { data, isError, isLoading } = useGetAllDataQuery();
  const [deleteDetail] = useDeleteDetailMutation();

  const columns = data ? (Object.keys(data[0]) as (keyof GetAllDataResponse)[]) : [];

  const removeDetail = async (id: number) => {
    try {
      await deleteDetail(id);
    } catch (error) {
      console.error("Error In Delete Detail", error);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error Found...</h1>;
  }

  return (
    <div className="mockdata-table-container">
      <table className="mockdata-table" >
        <thead className="mockdata-table-header" >
          <tr className="mockdata-header-row">
            {columns.map((column) => (
              <th className="mockdata-header-column" key={column}> {_.capitalize(column)} </th>
            ))}
            <th className="mockdata-header-column" >Action</th>
          </tr>
        </thead>
        <tbody className="mockdata-table-body">
          {data &&
            data.map((details) => (
              <tr className="mockdata-body-row" key={details.id}>
                {columns.map((column) => (
                  <td className="mockdata-body-column" key={`${details.id}-${column}`}> {details[column].toString()} </td>
                ))}
                <td className="mockdata-body-column" ><button className="remove-button"  onClick={() => removeDetail(details.id)}>&#x2715;</button></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MockData;
