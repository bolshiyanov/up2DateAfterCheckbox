import React, { useState, useEffect } from "react";
import { Layout, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../features/auth/authSlice";
import { CustomButton } from "../custom-button";
import style from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Header className={style.header} style={{paddingLeft: screenWidth < 768 ? 0 : 50, paddingRight: screenWidth < 768 ? 16 : 50}}>
      
        <div style={{ marginTop: 4, marginLeft: 16 }}>
          <Typography.Title level={screenWidth < 768 ? 2 : 1}>
            Up2Date
          </Typography.Title>
          
        </div>
        
      
      {user ? (
        <div style={{ marginTop: 24 }}>
          <CustomButton
            shape="round"
            type="default"
            icon={<FontAwesomeIcon icon={faRightFromBracket} />}
            onClick={onLogoutClick}
          >
            Log out
          </CustomButton>
        </div>
      ) : (
        <Space>
          {screenWidth > 768 && (
            <Link to="/register">
              <div style={{ marginTop: 24 }}>
                <CustomButton
                  shape="round"
                  type="default"
                  icon={<FontAwesomeIcon icon={faUserPlus} />}
                >
                  Sign up
                </CustomButton>
              </div>
            </Link>
          )}
          <Link to="/login">
            <div style={{ marginTop: 24, marginRight: 16 }}>
              <CustomButton
                shape="round"
                type="default"
                icon={<FontAwesomeIcon icon={faRightToBracket} />}
              >
                Log in
              </CustomButton>
            </div>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
