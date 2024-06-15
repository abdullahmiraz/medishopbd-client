"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { getAllUsersDetails } from "../../../../../api";
import TitleStyle from "../../../Shared/TitleStyle/TitleStyle";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getAllUsersDetails();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users ", error);
      }
    };
    fetchData();
  }, []);
  console.log(users);

  return (
    <>
      <div className="w-48 mx-auto">
        <h2 className="font-extrabold text-2xl text-center mx-auto my-4 border-b-4 border-b-green-400 ">
          Users List
        </h2>
      </div>
      <div className="overflow-x-auto m-4 border">
        <table className="table table-zebra table-xs">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Address</th>
              <th>Prescription?</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <th>{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.orders.length}</td>
                <td>{user.address}</td>
                <td>{user.prescription ? "true" : "false"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
