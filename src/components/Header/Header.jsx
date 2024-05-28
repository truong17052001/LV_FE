import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
const cx = classNames.bind(styles);

/* eslint-disable react/prop-types */ 
function Header({ type }) {
  return (
    <div className={cx("wrapper",type!=1?"bg1":"")}>
      <div className={cx("top-container")}>
        <div className={cx("info")}>
          <a
            title="0938 927 980"
            href="tel:+(84) 938 927 980"
            className={cx("link")}
          >
            (+84) 938 927 980
          </a>
          <a
            title="info@mytravel.com"
            href="mailto:info@webtravel.com"
            className={cx("link", "web")}
          >
            quangtruong@webtravel.com
          </a>
        </div>
        <div className={cx("list")}>
          <div className={cx("social")}>
            <a href="/" className={cx("a")}>
              <FaInstagram color="white" />
            </a>
            <a href="/" className={cx("a")}>
              <FaFacebookF color="white" />
            </a>
            <a href="/" className={cx("a")}>
              <FaYoutube color="white" />
            </a>
            <a href="/" className={cx("a")}>
              <FaTiktok color="white" />
            </a>
          </div>
          <div className={cx("action")}>
            <a href="/" className={cx("text")}>
              <FaGear className={cx("a")} />
            </a>
          </div>
        </div>
      </div>
      <div className={cx("bot-container", type==1?"divineB":"divineA")}>
        <div className={cx("navbar")}>
          <a href="/" className={cx("text", "icon")}>
            <FaSearch className={cx("a")} />
          </a>
          <div className={cx("navbar_content")}>
            <a href="/" className={cx("text", "title")}>
              Trang chủ
            </a>
            <a href="/about" className={cx("text", "title")}>
              Giới thiệu
            </a>
            <a href="/tour" className={cx("text", "title")}>
              Du lịch
            </a>
            <a className={cx("brand")}>
              <img
                src="https://mytour.webtravel.vn/images/logo-white.svg"
                alt=""
              ></img>
              Quang Trường Travel
            </a>
            <a href="/news" className={cx("text", "title")}>
              Tin tức
            </a>
            <a href="/sale" className={cx("text", "title")}>
              Khuyến mãi
            </a>
            <a href="/contact" className={cx("text", "title")}>
              Liên hệ
            </a>
          </div>

          <a href="/info" className={cx("text")}>
            <FaRegUser className={cx("a")} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
