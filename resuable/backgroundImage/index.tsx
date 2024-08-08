import React from 'react';
import styles from './index.module.css'; // Import the CSS module
import Image from 'next/image';
import logo from "../../public/img/logo.svg";
import { useRouter } from 'next/router';



const BgImg: React.FC= () => {
	const router = useRouter();

	const handleDashboardRoute = () => {
		router.push("/");
	};
    return (
        <div className={styles.background}>

        <div style={{ padding: "40px 37px" }} >
        <Image onClick={handleDashboardRoute} style={{cursor:'pointer'}} src={logo} alt="facebook" />
    </div>
        </div> 
    );
};

export default BgImg;
