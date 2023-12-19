import React from "react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Button, Row, Col } from "react-bootstrap";
import LogoutConfirmation from "../modals/LogoutConfirmation";

export const SidebarComp = ({ routes }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="sidebar-container">
      <Sidebar collapsed={collapsed}>
        <Row className="sidebar-header">
          <Col sm={2}>
            <Button
              variant=""
              className="collapse-button"
              onClick={handleToggleSidebar}
            >
              <FaBars />
            </Button>
          </Col>
          <Col lg={true}>
            <div className="profile-info">
              <img
                src={user.profil_pic}
                alt="Profile"
                className="rounded-circle profile-image"
              />
              {!collapsed && <span className="profile-name">{user.nama}</span>}
            </div>
          </Col>
        </Row>
        <Menu>
          {routes?.map((route, index) => (
            <MenuItem
              key={index}
              onClick={() => navigate(route.path)}
              icon={route.icon}
            >
              {route.name}
            </MenuItem>
          ))}
          <LogoutConfirmation />
        </Menu>
      </Sidebar>
    </div>
  );
};
