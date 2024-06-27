import React from "react";
import UserProfile from "../../../../../components/Dashboard/UserDash/UserProfile/UserProfile";

const UserProfilePage = ({ params }: any) => {
  console.log(params);
  return <UserProfile id={params.userId} />;
};

export default UserProfilePage;
