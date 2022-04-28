import React from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries/query";
import { useEffect, useState } from "react";

function GetUsers() {
  const { error, loading, data } = useQuery(LOAD_USERS);
  const [users,setUsers]=useState([]);

  useEffect(()=>{
    if(data){
        setUsers(data.getAllUsers);
    }
  }, [data]);
  
  return (
    <>
      <h1>Here is all the user</h1>
      <br></br>
      {users.map((val)=>{
          return <h2>{val.firstName}</h2>
      })}
    </>
  );
}

export default GetUsers;
