import { useEffect, useState } from "react";
import "./pagination.css";

import React from "react";

function Pagination() {
  const [data, setData] = useState([]);
  const [currData, setCurrData] = useState([]);
  const [page, SetPage] = useState(1);
  const totalPages = data.length ? Math.ceil(data.length / 10) : 1;
  useEffect(() => {
    const dataFetch = async () => {
      try {
        let response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        let data = await response.json();
        setData(data);
      } catch (e) {
        alert("failed to fetch data");
      }
    };
    dataFetch();
  }, []);
  useEffect(() => {
    const start = (page - 1) * 10;
    const end = start + 10;
    setCurrData([...data].slice(start, end));
  }, [data, page]);

  const handlePrev = () => {
    console.log(data.length);
    if (page > 1) {
      SetPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      SetPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <h1 className="heading">Employee Data Table</h1>
      <table className="Table">
        <thead className="Tablehead">
          <tr className="tablerow">
            <th>
              <h2>ID</h2>
            </th>
            <th>
              <h2>Name</h2>
            </th>
            <th>
              <h2>Email</h2>
            </th>
            <th>
              <h2>Role</h2>
            </th>
          </tr>
        </thead>
        <tbody className="tablebody">
          {currData.map((a) => {
            return (
              <tr key={a.id} className="tablerowdata">
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="buttons">
        <button className="previous" disabled={page === 1} onClick={handlePrev}>
          Previous
        </button>
        <p className="current-page">{page}</p>
        <button
          className="next"
          disabled={page === totalPages}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
