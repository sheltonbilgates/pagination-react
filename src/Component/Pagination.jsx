import axios from "axios";
import React, { useEffect, useState } from "react";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;

  // API call

  useEffect(() => {
    try {
      let api =
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

      axios.get(api).then((response) => {
        setData(response.data);
        setTotalPages(Math.ceil(response.data.length / rowsPerPage))
      });
    } catch (e) {
      console.log(e);
    }
  }, [rowsPerPage]);

  // console.log(data); -- check sucess

  // pagination logic
  const paginatedRows = () => {
    const firstIdx = (currentPage - 1) * rowsPerPage;
    const lastIdx = Math.min(firstIdx + rowsPerPage, data.length);

    return data.slice(firstIdx, lastIdx).map((row, idx) => (
      <tr className="h-10 border" key={idx}>
        <td align="left" className="pl-4">
          {row.id}
        </td>
        <td align="left">{row.name}</td>
        <td align="left">{row.email}</td>
        <td align="left">{row.role}</td>
      </tr>
    ));
  };

  //   handle next button
  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  //  handle prev button
  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="w-full">
        <h1 className="font-bold text-2xl text-center p-5">
          Employee Data Table
        </h1>
      </div>

      {/* Table */}
      <div className="w-full pr-8 pl-8">
        <table className="w-full ">
          <tr className="h-10 bg-green-600 border">
            <th align="left" className="pl-4">
              ID
            </th>
            <th align="left">Name</th>
            <th align="left">Email</th>
            <th align="left">Role</th>
          </tr>
          {paginatedRows()}
        </table>

        {/* Pagination */}

        <div className="w-full justify-between  text-center">
          <button
            className="pl-4 pr-4 bg-green-600 m-2 h-8 rounded"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pl-4 pr-4 bg-green-600 m-2 rounded">
            {currentPage}
          </span>
          <button
            className="pl-4 pr-4 bg-green-600 m-2 w-24 h-8 rounded"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
