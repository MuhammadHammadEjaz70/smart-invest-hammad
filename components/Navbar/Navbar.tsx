import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./navbar.module.css";
import IconButton from "@mui/material/IconButton";
import { Badge } from "react-bootstrap";
import { RootState } from "@/components/store";
import {
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import Typography from "@/resuable/Typography";

const NotificationPopover = styled(Popover)({
  maxWidth: "400px !important",
});

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { fetchGetDataApi, postDataToApi } from "@/utils/general";
import { Bars } from "react-loader-spinner";
import { useRouter } from "next/router";
import {
  ARROW_DOWN,
  LOGO,
  NOTIFICATION,
  SEARCH,
  SECOND_COIN,
} from "@/utils/images";
import Buttons from "@/resuable/Button/Button";
import ProfileImage from "@/resuable/ProfileImage";
import CustomModal from "../CustomModal";
import InputField from "@/resuable/InputField";
import { setCoins } from "../coinsSlice";
import moment from "moment";

const Navbar = (props: any) => {
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [username, setUsername] = useState(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleNotificationClick = (event: any) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleToggle = (event: any) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleClose = () => {
    setUserMenuAnchorEl(null);
  };

  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [text, setText] = useState("Mark as Read");
  const [notifications, setNotifications] = useState<any>([]);
  const [swiftCoinsNumber, setSwiftCoinsNumber] = useState(null);
  const [totalCoins, setTotalCoins] = useState(null);
  const [inputValue, setInputValue] = useState<number | any>("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const coins = useSelector<RootState, number | null>(
    (state) => state.coins.coins
  );

  const dispatch=useDispatch();

  const handleSearch = (event: any) => {
    event.preventDefault();
    // const result = inputValue.toLowerCase() === coinName.toLowerCase() ? coinName : 'Coin not found';
    // setSearchResults(result);
  };

  const handleModalClose = () => {
    setIsSearchModalOpen(false);
    setInputValue('');
    setSearchResults([]);
  };


  const [unread, setUnread] = useState(0);
  const role =
    typeof window != "undefined" ? localStorage.getItem("userType") : null;
  const isLead =
    typeof window != "undefined" ? localStorage.getItem("lead") : null;

  useEffect(() => {
    const storedUsername: any =
      typeof window != "undefined" ? localStorage.getItem("userName") : null;
    const coins: any =
      typeof window != "undefined" ? localStorage.getItem("coins") : null;
    setUsername(storedUsername);
    setSwiftCoinsNumber(coins);
  }, []);

  useEffect(()=>{
    fetchNotificationData();
    fetchData();
  },[])

  const fetchData = async () => {
    setloading(true);
    try {
      const response = await fetchGetDataApi("api/dashboard/user-dashboard-counters");
       dispatch(setCoins(response?.data?.result?.myCoins))
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }finally {
      setloading(false);
    }
  };
  const token =
    typeof window != "undefined" ? localStorage.getItem("userToken") : null;

  // useEffect(() => {
  //   handleNotifications();
  // }, []);

  const handleLogout = async (e: any) => {
    setloading(true);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");

    toast.success("Logout Successful!");
    router.push("/login");

    setloading(false);
  };

  // const handleNotifications = async () => {
  //   try {
  //     const response = await fetchGetDataApi(`api/notification/list`);
  //     setNotifications(response.data.result.data);
  //     const result = response.data.result.data;
  //     ``;
  //     const unreadCount = result
  //       .map((result: any) => !result.isRead)
  //       .filter((isRead: any) => isRead).length;
  //     setUnread(unreadCount);
  //   } catch (error: any) {
  //     if (error.resposne) {
  //       const errorMessage = error.response.data.message;
  //       toast.error(errorMessage);
  //     } else {
  //       toast.error("Failed to get notifications");
  //     }
  //   }
  // };

  const fetchNotificationData = async () => {
    setloading(true);
    try {
      const response = await fetchGetDataApi("api/notification/list");
      setNotifications(response?.data?.result?.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setloading(false);
    }
  };

  const handleMarkAsRead = async (id: any, isRead: any) => {
    const updated = {
      id: id,
      isRead: isRead,
    };
    try {
      const response = await postDataToApi("api/notification/mark", updated);
      // handleNotifications();
    } catch (error: any) {
      if (error.resposne) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Failed to get notifications");
      }
    }
    if (isRead) {
      setText((prevText) =>
        prevText === "Mark as Read" ? "Mark as Unread" : "Mark as Read"
      );
    }
  };

  const handleSettingsRoute = () => {
    router.push("/settings");
  };

  const handleNotificationRoute = () => {
    router.push("/notifications");
  };

  function handleDashboardRoute() {
    if (token) {
      router.push("/dashboard");
    } else {
      router.reload();
    }
  }

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
      <nav className={styles.navbar}>
        <div>
          <Image
            onClick={handleDashboardRoute}
            style={{ cursor: "pointer", width: "50px", height: "50px" }}
            src={LOGO}
            alt="..."
          />
          <h4
            onClick={handleDashboardRoute}
            style={{ cursor: "pointer" }}
            className={styles.logo}
          >
            Smart Invest
          </h4>
        </div>
        <div>
          {role !== "Admin" ?
          <div
            style={{
              background: "#1A1A1A",
              borderRadius: "24px",
              display: "flex",
              justifyContent: " center",
              alignItems: "center",
              color: "white",
              padding: "10px",
            }}
          >
            <Image
              src={SECOND_COIN}
              alt="..."
              style={{ height: "20px", width: "20px", marginRight: "10px" }}
            />
            <span className={styles.leftNavItems}> {coins}</span>
          </div>: null
          }
          {/* {role !== "SuperAdmin" ? (
            <div className={styles.searchdiv}>
              <Image
                className={styles.profileHide}
                src={SEARCH}
                alt="..."
                onClick={() => setIsSearchModalOpen(true)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ) : (
            <></>
          )} */}
          <div
            style={{
              height: "46px",
              width: "46px",
              background: "#1A1A1A",
              borderRadius: "50%",
              display: "flex",
              justifyContent: " center",
            }}
          >
            <Badge
              bg="danger"
              className="position-absolute"
              style={{
                fontSize: "0.5em",
                marginTop: "-1px",
                marginLeft: "24px",
                cursor: "pointer",
                padding: "3px",
              }}
              onClick={handleNotificationClick}
            >
              {unread === 0 ? "" : unread}
            </Badge>
            <Image
              src={NOTIFICATION}
              alt="Bell Icon"
              onClick={handleNotificationClick}
              style={{ cursor: "pointer" }}
            />
          </div>
          <NotificationPopover
            open={Boolean(notificationAnchorEl)}
            anchorEl={notificationAnchorEl}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            style={{ maxWidth: "400px", }}
          >
            <div className="p-2" style={{ background: "#1A1A1A", borderBottom: '1px solid #2E2E3E' }}>
              <Typography
                variant="headingM"
              >
                Notifications
              </Typography>

            </div>
            <List
              className={styles.Notify}
              style={{
                width: "370px",
                maxHeight: "370px",
                background: "#1A1A1A",
                overflow: "auto",
                marginTop: '2px'
              }}
            >
              {notifications.map((notification: any) => (
              <ListItem
                key={notification._id}
                style={{
                  background: notification.isRead ? "" : "",
                }}
              >
                <div style={{ width: "100%" }}>
                  <div className="d-flex">
                    <ListItemText
                      primary={
                        <Typography variant="text16">
                          {notification.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="text14notification">
                            {notification.description}&nbsp;
                          </Typography>
                          <Typography variant="text14notification">
                            <div className="d-flex justify-content-end mt-2">
                              <span style={{ fontSize: '11px', color: '#787878' }}>
                                {moment(notification.createdAt).fromNow()}
                              </span>
                            </div>
                          </Typography>
                        </>
                      }
                    />
                  </div>
                </div>
              </ListItem>
            ))}
            </List>

            <div className="py-2" style={{ background: "#1A1A1A" }}>
              <Buttons
                variant="view-all-btn"
                children="View All"
                onClick={handleNotificationRoute}
              />
            </div>
          </NotificationPopover>
          <div onClick={handleToggle} className={styles.profileDiv}>
            <IconButton aria-controls="user-menu" aria-haspopup="true">
              <ProfileImage height={36} width={36} />
            </IconButton>
            <span className={styles.profileName}>{username}</span>&nbsp;
            <Image
              src={ARROW_DOWN}
              alt="arrow-down"
              style={{
                filter:
                  "sepia(100%) saturate(1000%) hue-rotate(45deg) brightness(1.5)",
              }}
            />
          </div>
          <Menu
            id="user-menu"
            anchorEl={userMenuAnchorEl}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleClose}
          >
            {role !== "Admin" ? <MenuItem
              className={styles.profileShow}
              onClick={handleSettingsRoute}
            >
              Profile
            </MenuItem> :null}
            <MenuItem onClick={()=>setIsModalOpen(true)}>Logout</MenuItem>
          </Menu>
        </div>
      </nav>
      <CustomModal
        isOpen={isSearchModalOpen}
        onRequestClose={handleModalClose}
      >
        <Typography variant="headingS" className="text-center">
          Search
        </Typography>
        <form onSubmit={handleSearch}>
          <InputField
            name="coin"
            placeholder="Search..."
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
            type="search"
            mode="dark"
          />
          <Buttons
            variant="signUp-btn"
            children="Search"
            width="100%"
            type="submit"
          />
        </form>
        <div>
          {searchResults && <div style={{ textAlign: 'center', fontSize: '20px', color: '#fff' }}>{searchResults}</div>}
        </div>
      </CustomModal>
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
};

export default Navbar;
