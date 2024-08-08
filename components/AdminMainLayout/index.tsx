import React from "react";
import UserLeftNav from "../UserLeftNav";
import styles from "./index.module.css";
import Navbar from "../Navbar/Navbar";

function AdminMainLayout({ children }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#1a1a1a' }}>
      <Navbar />
      <div className="w-100 d-flex">
        <UserLeftNav />
        <div className={styles.mainLayout}>{children}</div>
      </div>
    </div>
  );
}

export default AdminMainLayout;
