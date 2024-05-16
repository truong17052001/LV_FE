import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx("wrapper")}>
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
              <FaRegUser className={cx("a")} />
              <FaAngleDown />
            </a>
            <a href="/" className={cx("text")}>
              <FaGear className={cx("a")} />
              <FaAngleDown />
            </a>
          </div>
        </div>
      </div>
      <div className={cx("bot-container", "divine")}>
        <a className={cx("brand")}>
          <img
            src="https://mytour.webtravel.vn/images/logo-white.svg"
            alt=""
          ></img>
          MyTravel
        </a>
        <div className={cx("brand")}>
            
        </div>
      </div>
    </div>
  );
}

export default Header;
