import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Buttons from "../../resuable/Button/Button";
import "react-toastify/dist/ReactToastify.css";

import {
  faHome,
  faMoneyBillWave,
  faHandHoldingUsd,
  faExchangeAlt,
  faCog,
  faChartLine,
  faHistory,
  faShoppingBasket,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchGetDataApi } from "@/utils/general";
import {
  FaArrowDown,
  FaArrowUp,
  FaBookDead,
  FaCoins,
  FaMoneyCheck,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import ProfileImage from "@/resuable/ProfileImage";
import Image from "next/image";
import { ARROW_DOWN, ARROW_UP, LOG_OUT } from "@/utils/images";
import CustomModal from "../CustomModal";
import Typography from "@/resuable/Typography";
import { Bars } from "react-loader-spinner";

function UserLeftNav() {
  const [path, setPath] = useState("");
  const router = useRouter();
  const [role, setRole] = useState<any>("");
  const [isLead, setLead] = useState<any>("");
  const [userData, setUserData] = useState<any>({});
  const [username, setUsername] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isStakePLanOpen, setIsStakePlanOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleLogout = async (e: any) => {
    setloading(true);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");

    toast.success("Logout Successfull!");
    router.push("/login");

    setloading(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    setIsStakePlanOpen(false);
  };
  const handleStakePlanClick = () => {
    setIsStakePlanOpen(!isStakePLanOpen);
    setIsOpen(false);
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    // fetchUserData(id);
  }, []);

  function getCurrentRoute() {
    setPath(router.pathname);
  }

  const fetchUserData = async (id: any) => {
    try {
      const response = await fetchGetDataApi(`api/user/show/${id}`);
      setUserData(response.data.result);
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Request Failed For Show User Api !");
      }
      console.error("Error Fetching Response: ", error);
    }
  };

  useEffect(() => {
    const role =
      typeof window !== "undefined" ? localStorage.getItem("userType") : null;
    setRole(role);

    const username =
      typeof window !== "undefined" ? localStorage.getItem("userName") : null;
    setUsername(username);
    const isLead =
      typeof window !== "undefined" ? localStorage.getItem("lead") : null;
    setLead(isLead);
    getCurrentRoute();
  }, []);

  useEffect(() => {
    const handleNavigation = (url: any) => {
    };

    // Listen to the route change event
    const onRouteChange = (url: any) => handleNavigation(url);
    router.events.on("routeChangeComplete", onRouteChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      router.events.off("routeChangeComplete", onRouteChange);
    };
  }, [router]);

  return (
    <>
    <Bars
        height="80"
        width="80"
        color="#ECAC1A"
        ariaLabel="bars-loading"
        wrapperStyle={{}} 
        wrapperClass="loading-spinner-overlay"
        visible={loading}
      />
      <nav className={`${styles.hidesScroll} ${styles.navbar}`}>
        <div className="d-flex" style={{flexDirection:'column'}}>
          <div className={styles.profile}>
            <div
              className={styles.left_nav_image}
              style={{
                borderRadius: "16px",
                border: "1px dashed #ECAC1A",
                background: "#1A1A1A",
                height: "100%",
                width: "100%",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "23px",
                  }}
                >
                  <ProfileImage height={70} width={70} />
                </div>
                <p
                  className="mt-2"
                  style={{
                    color: "#ffffff",
                    fontWeight: "500",
                    textAlign: "center",
                    fontSize: "14px",
                    marginBottom: '6px',
                  }}
                >
                  {username}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    textAlign: "center",
                    color: "#FFE864",
                  }}
                >
                  {role !== "Admin" ? "USER" : "ADMIN"}
                </p>
              </div>
            </div>
          </div>

          <div className={` ${styles.items}`}>
            <div>
              {role === "Admin" ? (
                <>
                  <Link
                    className="my-2"
                    href="/dashboard"
                    style={{
                      textDecoration: "none",
                      lineHeight: "1rem",
                      padding: "22px",
                      background:
                        path === "/dashboard"
                          ? "linear-gradient(90deg, #151515 0%, #ECAC1A 100%)"
                          : "none",
                      borderRadius: "12px",
                    }}
                  >
                    <div onClick={getCurrentRoute} className={styles.setOuterBorder}>
                      <FontAwesomeIcon
                        icon={faHome}
                        style={{
                          width: "16px",
                          height: "18px",
                          color: path == "/dashboard" ? "white" : "#C0C0C0",
                        }}
                        className={styles.setIconShape}
                      />
                    </div>
                    <span
                      onClick={getCurrentRoute}
                      style={{
                        color: path == "/dashboard" ? "#fff" : "#C0C0C0",
                        fontSize: "16px",
                        fontWeight: " 500",
                      }}
                    >
                      &nbsp; Dashboard
                    </span>
                  </Link>

                  <Link
                    href="/subscription-plan-list"
                    className={`my-2  ${styles.active}`}
                    style={{
                      textDecoration: "none",
                      lineHeight: "1rem",
                      padding: "22px",
                      background:
                        path === "/subscription-plan-list"
                          ? "linear-gradient(90deg, #151515 0%, #ECAC1A 100%)"
                          : "none",
                      borderRadius: "12px",
                    }}
                  >
                    <div onClick={getCurrentRoute} className={styles.setOuterBorder}>
                      <FaBookDead
                        style={{
                          width: "16px",
                          height: "18px",
                          color:
                            path == "subscription-plan-list" ? "white" : "#C0C0C0",
                        }}
                        className={styles.setIconShape}
                      />
                    </div>
                    <span
                      onClick={getCurrentRoute}
                      style={{
                        textDecoration: " none",
                        color: path == "/subscription-plan-list" ? "#fff" : "#C0C0C0",
                        fontSize: "16px",
                        fontWeight: " 500",
                      }}
                    >
                      &nbsp; Stake Packages
                    </span>
                  </Link>
                  <Link
                    href="/user-request-list"
                    className={`my-2 ${styles.active}`}
                    style={{
                      textDecoration: "none",
                      lineHeight: "1rem",
                      padding: "22px",
                      background:
                        path === "/user-request-list"
                          ? "linear-gradient(90deg, #151515 0%, #ECAC1A 100%)"
                          : "none",
                      borderRadius: "12px",
                    }}
                  >
                    <div onClick={getCurrentRoute} className={styles.setOuterBorder}>
                      <FaUserPlus
                        style={{
                          width: "16px",
                          height: "18px",
                          color: path == "/user-request-list" ? "white" : "#C0C0C0",
                        }}
                        className={styles.setIconShape}
                      />
                    </div>
                    <span
                      onClick={getCurrentRoute}
                      style={{
                        textDecoration: " none",
                        color: path == "/user-request-list" ? "#fff" : "#C0C0C0",
                        fontSize: "16px",
                        fontWeight: " 500",
                      }}
                    >
                      &nbsp; User Deposit
                    </span>
                  </Link>
                  <Link
                    href="/user-withdraw-request-list"
                    className={`my-2 ${styles.active}`}
                    style={{
                      textDecoration: "none",
                      lineHeight: "1rem",
                      padding: "22px",
                      background:
                        path === "/user-withdraw-request-list"
                          ? "linear-gradient(90deg, #151515 0%, #ECAC1A 100%)"
                          : "none",
                      borderRadius: "12px",
                    }}
                  >
                    <div onClick={getCurrentRoute} className={styles.setOuterBorder}>
                      <FaUserPlus
                        style={{
                          width: "16px",
                          height: "18px",
                          color: path == "/user-withdraw-request-list" ? "white" : "#C0C0C0",
                        }}
                        className={styles.setIconShape}
                      />
                    </div>
                    <span
                      onClick={getCurrentRoute}
                      style={{
                        textDecoration: " none",
                        color: path == "/user-withdraw-request-list" ? "#fff" : "#C0C0C0",
                        fontSize: "16px",
                        fontWeight: " 500",
                      }}
                    >
                      &nbsp; User Withdraw
                    </span>
                  </Link>
                  <Link
                    href="/management"
                    className={`my-2 ${styles.active}`}
                    style={{
                      textDecoration: "none",
                      lineHeight: "1rem",
                      padding: "22px",
                      background:
                        path === "/management"
                          ? "linear-gradient(90deg, #151515 0%, #ECAC1A 100%)"
                          : "none",
                      borderRadius: "12px",
                    }}
                  >
                    <div onClick={getCurrentRoute} className={styles.setOuterBorder}>
                      <FaCoins
                        style={{
                          width: "16px",
                          height: "18px",
                          color: path == "management" ? "white" : "#C0C0C0",
                        }}
                        className={styles.setIconShape}
                      />
                    </div>
                    <span
                      onClick={getCurrentRoute}
                      style={{
                        textDecoration: " none",
                        color: path == "management" ? "#fff" : "#C0C0C0",
                        fontSize: "16px",
                        fontWeight: " 500",
                      }}
                    >
                      &nbsp; Management
                    </span>
                  </Link>
                  <Link
                    href="/user-list"
                    className={`my-2 ${styles.active}`}
                    style={{
                      textDecoration: "none",
                      lineHeight: "1rem",
                      padding: "22px",
                      background:
                        path === "/user-list"
                          ? "linear-gradient(90deg, #151515 0%, #ECAC1A 100%)"
                          : "none",
                      borderRadius: "12px",
                    }}
                  >
                    <div onClick={getCurrentRoute} className={styles.setOuterBorder}>
                      <FaUser
                        style={{
                          width: "16px",
                          height: "18px",
                          color: path == "/user-list" ? "white" : "#C0C0C0",
                        }}
                        className={styles.setIconShape}
                      />
                    </div>
                    <span
                      onClick={getCurrentRoute}
                      style={{
                        textDecoration: " none",
                        color: path == "/user-list" ? "#fff" : "#C0C0C0",
                        fontSize: "16px",
                        fontWeight: " 500",
                      }}
                    >
                      &nbsp; Users
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className="my-2"
                    style={{
                      textDecoration: "none",
                      lineHeight: "1rem",
                      padding: "22px",
                      background:
                        path === "/dashboard"
                          ? "linear-gradient(90deg, #151515 0%, #ECAC1A 100%)"
                          : "none",
                      borderRadius: "12px",
                    }}
                  >
                    <div onClick={getCurrentRoute} className={styles.setOuterBorder}>
                      <FontAwesomeIcon
                        icon={faHome}
                        style={{
                          width: "16px",
                          height: "18px",
                          color: path == "/dashboard" ? "white" : "#C0C0C0",
                        }}
                        className={styles.setIconShape}
                      />
                    </div>
                    <span
                      onClick={getCurrentRoute}
                      style={{
                        color: path == "/dashboard" ? "#fff" : "#C0C0C0",
                        textDecoration: "none",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      &nbsp; Dashboard
                    </span>
                  </Link>

                  {role !== "Admin" && (
                    <>
                      <Link
                        href="/withdraw"
                        className={`my-2 ${styles.active}`}
                        style={{
                          textDecoration: "none",
                          lineHeight: "1rem",
                          padding: "22px",
                          background:
                            path === "/withdraw"
                              ? "linear-gradient(90deg, #151515 0%, #ECAC1A 100%)"
                              : "none",
                          borderRadius: "12px",
                        }}
                      >
                        <div
                          onClick={getCurrentRoute}
                          className={styles.setOuterBorder}
                        >
                          <FaMoneyCheck
                            style={{
                              width: "16px",
                              height: "18px",
                              color: path == "/withdraw" ? "white" : "#C0C0C0",
                            }}
                            className={styles.setIconShape}
                          />
                        </div>
                        <span
                          onClick={getCurrentRoute}
                          style={{
                            textDecoration: " none",
                            color: path == "/withdraw" ? "#fff" : "#C0C0C0",
                            fontSize: "16px",
                            fontWeight: " 500",
                          }}
                        >
                          &nbsp; Withdraw
                        </span>
                      </Link>

                      <div className={styles.depositIcon}>
                        <div
                          className="d-flex"
                          onClick={handleClick}
                          style={{
                            background: isOpen
                              ? "linear-gradient(90deg, #151515 0%, #ECAC1A 100%)"
                              : "none",
                            textDecoration: "none",
                            lineHeight: "1rem",
                            padding: "22px",
                            borderRadius: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <div className={styles.setOuterBorder}>
                            <FontAwesomeIcon
                              icon={faMoneyBillWave}
                              style={{
                                width: "16px",
                                height: "18px",
                                color: path === "/deposit-coins" ? "white" : "#C0C0C0",
                              }}
                              className={styles.setIconShape}
                            />
                          </div>
                          <span
                            className={`mx-2 ${styles.hideText}`}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              color: isOpen ? "#fff" : "#C0C0C0",
                              textDecoration: "none",
                              fontSize: "16px",
                              fontWeight: "500",
                              width: "50%",
                            }}
                          >
                            Deposit
                            {!isOpen ? (
                              <Image src={ARROW_UP} alt="arrowup" style={{ marginLeft: '100%' }} />
                            ) : (
                              <Image src={ARROW_DOWN} alt="arrowdown" style={{ marginLeft: '100%' }} />
                            )}
                          </span>
                        </div>
                        {isOpen && (
                          <div
                            className={styles.collapsibleContainer}
                            style={{
                              marginLeft: " 12%",
                              lineHeight: "25px",
                              marginTop: "15px",
                            }}
                          >
                            <div>
                              <Link
                                className={styles.collapsibleOption}
                                href="/deposit-coins"
                                style={{ color: path === "/deposit-coins" ? "#ECAC1A" : "#C0C0C0", }}
                              >
                                <FontAwesomeIcon
                                  icon={faShoppingBasket}
                                  className="mr-2"
                                  title="Buy Now"
                                />
                                <span className={styles.hideText}>Buy Now</span>
                              </Link>
                              <Link
                                className={styles.collapsibleOption}
                                href="/deposit-history"
                                style={{
                                  color: path === "/deposit-history" ? "#ECAC1A" : "#C0C0C0",
                                  marginTop: "15px",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faMoneyBillWave}
                                  className="mr-2"
                                  title="Deposit History"
                                />
                                <span className={styles.hideText}>
                                  Deposit History
                                </span>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={styles.depositIcon}>
                        <div
                          className="d-flex"
                          onClick={handleStakePlanClick}
                          style={{
                            textDecoration: "none",
                            lineHeight: "1rem",
                            padding: "22px",
                            background: isStakePLanOpen
                              ? "linear-gradient(90deg, #151515 0%, #ECAC1A 100%)"
                              : "none",
                            borderRadius: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <div className={styles.setOuterBorder}>
                            <FontAwesomeIcon
                              icon={faHandHoldingUsd}
                              style={{
                                width: "16px",
                                height: "18px",
                                color: path === "/subscription" ? "white" : "#C0C0C0",
                              }}
                              className={styles.setIconShape}
                            />
                          </div>
                          <span
                            className={`mx-2 ${styles.hideText}`}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              color: isStakePLanOpen ? "#fff" : "#C0C0C0",
                              textDecoration: "none",
                              fontSize: "16px",
                              fontWeight: "500",
                              width: "59%",
                            }}
                          >
                            Stake
                            {!isStakePLanOpen ? (
                              <Image src={ARROW_UP} alt="arrowup" style={{ marginLeft: '100%' }} />
                            ) : (
                              <Image src={ARROW_DOWN} alt="arrowdown" style={{ marginLeft: '100%' }} />
                            )}
                          </span>
                        </div>
                        {isStakePLanOpen && (
                          <div
                            className={styles.collapsibleContainer}
                            style={{
                              lineHeight: "25px",
                              marginTop: "9px",
                              marginLeft: " 12%",
                            }}
                          >
                            <div>
                              <a
                                className={styles.collapsibleOption}
                                href="/stake-plan"
                                style={{
                                  color: path === "/stake-plan" ? "#ECAC1A" : "#C0C0C0",
                                  marginTop: '15px',
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faChartLine}
                                  className="mr-2"
                                  title="Stake Plans"
                                />
                                <span className={styles.hideText}>Stake Plans</span>
                              </a>
                              <a
                                className={styles.collapsibleOption}
                                href="/stake-history"
                                style={{
                                  color: path === "/stake-history" ? "#ECAC1A" : "#C0C0C0",
                                  marginTop: '15px',
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faHistory}
                                  className="mr-2"
                                  title="Stake History"
                                />
                                <span className={styles.hideText}>Stake History</span>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                      <Link
                        className="my-2"
                        href="/p2p"
                        style={{
                          textDecoration: "none",
                          lineHeight: "1rem",
                          padding: "22px",
                          background:
                            path === "/p2p"
                              ? "linear-gradient(90deg, #151515 0%, #ECAC1A 100%)"
                              : "none",
                          borderRadius: "12px",
                        }}
                      >
                        <div
                          onClick={getCurrentRoute}
                          className={styles.setOuterBorder}
                        >
                          <FontAwesomeIcon
                            icon={faExchangeAlt}
                            style={{
                              width: "16px",
                              height: "18px",
                              color: path == "/my-documents" ? "white" : "#C0C0C0",
                            }}
                            className={styles.setIconShape}
                          />
                        </div>
                        <span
                          onClick={getCurrentRoute}
                          style={{
                            color: path == "/my-documents" ? "#fff" : "#C0C0C0",
                            textDecoration: "none",
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                        >
                          &nbsp; P2P
                        </span>
                      </Link>
                      <Link
                        href="/settings"
                        className="my-2"
                        style={{
                          textDecoration: "none",
                          lineHeight: "1rem",
                          padding: "22px",
                          background:
                            path === "/settings"
                              ? "linear-gradient(90deg, #151515 0%, #ECAC1A 100%)"
                              : "none",
                          borderRadius: "12px",
                        }}
                      >
                        <div
                          onClick={getCurrentRoute}
                          className={styles.setOuterBorder}
                        >
                          <FontAwesomeIcon
                            icon={faCog}
                            style={{
                              width: "16px",
                              height: "18px",
                              color: path == "/my-documents" ? "white" : "#C0C0C0",
                            }}
                            className={styles.setIconShape}
                          />
                        </div>
                        <span
                          onClick={getCurrentRoute}
                          style={{
                            color: path == "/my-documents" ? "#fff" : "#C0C0C0",
                            textDecoration: "none",
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                        >
                          &nbsp; Settings
                        </span>
                      </Link>
                    </>
                  )}

                  <Link
                    href="/notifications"
                    className={`my-2 ${styles.active}`}
                    style={{
                      textDecoration: "none",
                      lineHeight: "1rem",
                      padding: "22px",
                      background:
                        path === "/notifications"
                          ? "linear-gradient(90deg, #151515 0%, #ECAC1A 100%)"
                          : "none",
                      borderRadius: "12px",
                    }}
                  >
                    <div onClick={getCurrentRoute} className={styles.setOuterBorder}>
                      <FontAwesomeIcon
                        icon={faBell}
                        style={{
                          width: "16px",
                          height: "18px",
                          color: path == "/notifications" ? "white" : "#C0C0C0",
                        }}
                        className={styles.setIconShape}
                      />
                    </div>
                    <span
                      onClick={getCurrentRoute}
                      style={{
                        textDecoration: " none",
                        color: path == "/notifications" ? "#fff" : "#C0C0C0",
                        fontSize: "16px",
                        fontWeight: " 500",
                      }}
                    >
                      &nbsp; Notifications
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-center mt-5 mb-3" onClick={()=>setIsModalOpen(true)}>
            <div className="d-flex justify-content-center">
              <div className={styles.logoutBtn}>
                <Image src={LOG_OUT} alt="power" />
              </div>
            </div>
            <span className={`my-2 ${styles.powerText}`}>Log Out</span>
        </div>
      </nav>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <Typography variant="headingM" className="text-center mb-2">
          Confirm Logout
        </Typography>
        <Typography variant="text18Light" className="text-center">
          Are you sure you want to Logout?
        </Typography>
        <div className={`d-flex justify-content-center mt-5 ${styles.modalButtons}`}>
          <Buttons
            variant="border"
            children="Cancel"
            onClick={() => setIsModalOpen(false)}
          />&nbsp;&nbsp;
          <Buttons
            variant="border"
            children="Logout"
            onClick={handleLogout}
          />
        </div>
      </CustomModal>
    </>
  );
}

export default UserLeftNav;
