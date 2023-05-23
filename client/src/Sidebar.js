import React from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";

function Sidebar() {

  return (
    <div className="sidebar">
      <div style={{ position: "relative", display: "inline-block" }}>
  <img src={process.env.PUBLIC_URL + "/bhichar.png"} style={{ width: "100px", height: "100px" }} />
  <p style={{ position: "absolute", bottom: 0, right: 0, transform: "translate(75%, -50%)", margin: 0, fontFamily: "Arial", fontSize: "30px", color: "rgb(69,105,203)" }}>ichaar</p>
</div>

      <SidebarOption Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={SearchIcon} text="Explore" />
      <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
      <SidebarOption Icon={ListAltIcon} text="Lists"/>
      <SidebarOption Icon={PermIdentityIcon} text="Profile"/>
      <SidebarOption Icon={MoreHorizIcon} text="More" />

      {/* Button -> Tweet */}
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
    </div>
  );
}

export default Sidebar;
