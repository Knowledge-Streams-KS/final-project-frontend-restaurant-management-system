import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo1 from "../assets/Logo/logo(1).png";
import {
  FaRegUserCircle,
  FaBell,
  FaShoppingCart,
  FaCheckCircle,
  FaEdit,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import notificationSound from "../assets/notification/bell.wav";
import { io } from "socket.io-client";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const notifDropdownRef = useRef(null);
  const audioRef = useRef(new Audio(notificationSound));

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNotifDropdown = () => {
    setNotifDropdownOpen(!notifDropdownOpen);
    if (!notifDropdownOpen) {
      setHasUnreadNotifications(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        notifDropdownRef.current &&
        !notifDropdownRef.current.contains(event.target)
      ) {
        setNotifDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    const handleNewNotification = (message, icon) => {
      setNotifications((prevNotifications) => {
        const updatedNotifications = [
          { message, icon },
          ...prevNotifications.slice(0, 4), // Keep the latest 5 notifications
        ];
        setHasUnreadNotifications(true);
        return updatedNotifications;
      });
      audioRef.current.play();
      toast.success(message);
    };

    newSocket.on("newOrder", (newOrder) => {
      handleNewNotification(
        `New order received: ${newOrder.id}`,
        <FaShoppingCart />,
      );
    });

    newSocket.on("orderStatusUpdated", (updatedOrder) => {
      handleNewNotification(
        `Order ${updatedOrder.id} status updated to ${updatedOrder.status}`,
        <FaCheckCircle />,
      );
    });

    newSocket.on("orderUpdated", (updatedOrder) => {
      handleNewNotification(`Order ${updatedOrder.id} updated`, <FaEdit />);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("Notifications state changed:", notifications);
  }, [notifications]);

  return (
    <nav className="bg-gray-900 p-1">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="#" className="text-xl font-semibold text-white">
          <img src={Logo1} alt="RMS Logo" className="h-1/5 w-1/3 invert" />
        </Link>
        {user ? (
          <div className="relative flex items-center">
            <div className="relative mr-2">
              <FaBell
                className="cursor-pointer text-xl text-white"
                onClick={toggleNotifDropdown}
              />
              {hasUnreadNotifications && (
                <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
              )}
              {notifDropdownOpen && (
                <div
                  ref={notifDropdownRef}
                  className="absolute right-0 z-10 mt-2 w-96 rounded-lg bg-white shadow-lg"
                >
                  <div className="p-4">
                    <h4 className="mb-2 font-semibold">Notifications</h4>
                    {notifications.length === 0 ? (
                      <p>No notifications</p>
                    ) : (
                      <ul>
                        {notifications.map((notification, index) => (
                          <li key={index} className="mb-1 flex items-center">
                            <span className="mr-2">{notification.icon}</span>
                            <span>{notification.message}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <FaRegUserCircle
                className="ml-2 cursor-pointer text-2xl text-white"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 z-10 mt-2 w-48 rounded-lg bg-white shadow-lg"
                >
                  <ul className="py-1">
                    <li className="hover:bg-gray-100">
                      <Link
                        to="/profile"
                        className="flex h-full w-full items-center px-4 py-2 text-gray-700"
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="hover:bg-gray-100">
                      <button
                        className="flex h-full w-full items-center px-4 py-2 text-gray-700"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link to="/signin" className="text-lg text-white hover:underline">
            Sign In
          </Link>
        )}
        <Toaster />
      </div>
    </nav>
  );
};

export default Navbar;
