import { useState } from "react";
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
import { IoIosPeople } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { MdDashboard } from "react-icons/md";
import ExitIcon from "@rsuite/icons/Exit";

function SideNav() {
    const [expanded, setExpanded] = useState(true);
    const handleOpen = () => {
      setExpanded(!expanded);
    }
  return (
    <div className={cx("content",expanded==true ? "": "mini")}>
      <a className={cx("header")} onClick={handleOpen}>
        <IoIosPlanet fontSize={27} className={cx("icon")} />
        <p>Quang Trường Travel</p>
      </a>
      <a href="/dashboard" className={cx("wrapper")}>
        <MdDashboard fontSize={27} className={cx("icon")} />
        <p>Thống kê</p>
      </a>
      <a href="/admin/tour" className={cx("wrapper")}>
        <MdTour fontSize={27} className={cx("icon")} />
        <p>Danh sách tour</p>
      </a>
      <a href="/admin/date" className={cx("wrapper")}>
        <SlCalender fontSize={27} className={cx("icon")} />
        <p>Danh sách ngày đi</p>
      </a>
      <a href="/admin/guider" className={cx("wrapper")}>
        <IoIosPeople fontSize={27} className={cx("icon")} />
        <p>Danh sách hướng dẫn viên</p>
      </a>
      <a href="/admin/user" className={cx("wrapper")}>
        <FaUser fontSize={27} className={cx("icon")} />
        <p>Danh sách người dùng</p>
      </a>
      <a href="/admin/hotel" className={cx("wrapper")}>
        <FaHotel fontSize={27} className={cx("icon")} />
        <p>Danh sách khách sạn</p>
      </a>
      <a href="/admin/vehicle" className={cx("wrapper")}>
        <MdOutlineEmojiTransportation fontSize={27} className={cx("icon")} />
        <p>Danh sách phương tiện</p>
      </a>
      <a href="/admin/booking" className={cx("wrapper")}>
        <RiBillFill fontSize={27} className={cx("icon")} />
        <p>Danh sách booking</p>
      </a>
      <a href="/admin/place" className={cx("wrapper")}>
        <MdPlace fontSize={27} className={cx("icon")} />
        <p>Danh sách địa điểm</p>
      </a>
      <a href="/admin/news" className={cx("wrapper")}>
        <FaRegNewspaper fontSize={27} className={cx("icon")} />
        <p>Quản lý tin tức</p>
      </a>
      <a href="/admin/discount" className={cx("wrapper")}>
        <MdDiscount fontSize={27} className={cx("icon")} />
        <p>Danh sách ưu đãi</p>
      </a>
      <a href="/admin/discount" className={cx("wrapper")}>
        <ExitIcon fontSize={27} className={cx("icon")} />
        <p>Đăng xuất</p>
      </a>
    </div>
  );
}

export default SideNav;
