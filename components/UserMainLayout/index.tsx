import React from "react";
import UserLeftNav from "../UserLeftNav";

function UserMainLayout({
  auth = false,
  children,
  activeTabFromTop = 1,
}: any) {
  return (
    <>
      <div className="container" style={{ gap: "40px" }}>
        <UserLeftNav />
        <div className="main_body">{children}</div>
      </div>
    </>
  );
}

export default UserMainLayout;
