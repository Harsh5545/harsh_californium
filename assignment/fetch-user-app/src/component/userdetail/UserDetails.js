import React, { useState } from "react";
import "./userDetails.css";
import { NavLink } from "react-router-dom";

function UserDetails() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const data = JSON.parse(localStorage.getItem("users"));

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let filteredData = data;
  if (filter !== "all") {
    filteredData = data.filter((user) => user.gender === filter);
  }

  if (search) {
    filteredData = filteredData.filter(
      (user) =>
        (user.name.first + " " + user.name.last)
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  const pageData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="container">
      <div className="sub-Container">
        <div>
          {/* <i className="material-icons">search</i> */}
          <input
            type="text"
            placeholder="Search by name or email"
            className="form-control"
            onChange={handleSearchChange}
          ></input>
        </div>
        <NavLink to="/">
          <i className="material-icons">home</i>
        </NavLink>
        <div className="pagechange">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          a Page {page}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>

            <th>
              <select value={filter} onChange={handleFilterChange}>
                <option value="all">gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </th>
            <th>Age</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Country</th>
            <th>Location</th>

            <th>Picture</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {pageData.map((user, index) => (
            <tr key={user.login.uuid}>
              <td>
                {user.name.first} {user.name.last}
              </td>

              <td>{user.gender}</td>
              <td>{user.dob.age}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td> {user.location.country} </td>

              <td>
                {user.location.street.name}
                {user.location.street.number}
                {user.location.city}, {user.location.state}
              </td>

              <td>
                <img src={user.picture.thumbnail} alt={user.name.first} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
