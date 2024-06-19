// import * as React from "react";
import classNames from "classnames/bind";
import styles from "./SideNav.module.scss";

const cx = classNames.bind(styles);
//icon
import { IoIosPlanet } from "react-icons/io";
import { MdTour } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { MdPlace } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";

function SideNav() {
  //   const [expanded, setExpanded] = React.useState(true);
  return (
    <div className={cx("content")}>
      <a href="/dashboard" className={cx("header")}>
        <IoIosPlanet fontSize={27} />
        Quang Trường Travel
      </a>
      <a href="/admin/tour" className={cx("wrapper")}>
        <MdTour fontSize={27} color={"#2d4271"} />
        Danh sách tour
      </a>
      <a href="/admin/user" className={cx("wrapper")}>
        <FaUser fontSize={27} color={"#2d4271"} />
        Danh sách người dùng
      </a>
      <a href="/admin/hotel" className={cx("wrapper")}>
        <FaHotel fontSize={27} color={"#2d4271"} />
        Danh sách khách sạn
      </a>
      <a href="/admin/vehicle" className={cx("wrapper")}>
        <MdOutlineEmojiTransportation fontSize={27} />
        Danh sách phương tiện
      </a>
      <a href="/admin/booking" className={cx("wrapper")}>
        <RiBillFill fontSize={27} color={"#2d4271"} />
        Danh sách booking
      </a>
      <a href="/admin/place" className={cx("wrapper")}>
        <MdPlace fontSize={27} color={"#2d4271"} />
        Danh sách địa điểm
      </a>
      <a href="/admin/news" className={cx("wrapper")}>
        <FaRegNewspaper fontSize={27} color={"#2d4271"} />
        Quản lý tin tức
      </a>
      <a href="/admin/discount" className={cx("wrapper")}>
        <MdDiscount fontSize={27} color={"#2d4271"} />
        Danh sách ưu đãi
      </a>
    </div>
  );
}

export default SideNav;
