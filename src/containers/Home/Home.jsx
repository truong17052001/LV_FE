import * as React from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
//icon
import { FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { RiArrowDropDownFill } from "react-icons/ri";
import { MdOutlineAttachMoney } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { MdOutlineLocationOn } from "react-icons/md";
const cx = classNames.bind(styles);

function HomePage() {
  const [open, setOpen] = React.useState(true);

  const handleChange = () => {
    if (open == true) setOpen(false);
    else setOpen(true);
  };
  return (
    <div className={cx("wrapper")}>
      <Header></Header>
      <section className={cx("banner")}>
        <div className={cx("bg-overlay")}></div>
        <div className={cx("title")}>
          <h1>Du lịch trong nước</h1>
          <p>
            Một chuyến đi không chỉ là sự di chuyển, đó là một hành trình trải
            nghiệm
          </p>
        </div>
        <div className={cx("search-home")}>
          <form className={cx("form-search")}>
            <div className={cx("box-search")}>
              Nơi khởi hành
              <div className={cx("input-search")}>
                <CiLocationOn />
                <input
                  type="text"
                  placeholder="Chọn nơi khởi hành"
                  readOnly
                ></input>
                <div className={cx("list-search", open == true?"open":"")}>

                </div>
                <RiArrowDropDownFill
                  className={cx("pointer")}
                  onClick={handleChange}
                />
              </div>
            </div>
            <div className={cx("box-search")}>
              Điểm đến
              <div className={cx("input-search")}>
                <MdOutlineLocationOn />
                <input type="text" placeholder="Chọn điểm đến" readOnly></input>
                <RiArrowDropDownFill className={cx("pointer")} />
              </div>
            </div>
            <div className={cx("box-search")}>
              Ngày khởi hành
              <div className={cx("input-search")}>
                <SlCalender />
                <input
                  type="text"
                  placeholder="Chọn ngày khởi hành"
                  readOnly
                ></input>
                <RiArrowDropDownFill className={cx("pointer")} />
              </div>
            </div>
            <div className={cx("box-search")}>
              Giá tour
              <div className={cx("input-search")}>
                <MdOutlineAttachMoney />
                <input type="text" placeholder="Chọn giá tour" readOnly></input>
                <RiArrowDropDownFill className={cx("pointer")} />
              </div>
            </div>
            <button>
              <FaSearch />
              <p>Tìm kiếm</p>
            </button>
          </form>
        </div>
      </section>
      <section className={cx("hot_location")}>

      </section>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
