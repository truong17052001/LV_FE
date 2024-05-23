import * as React from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CardTour from "../../components/CardTour/CardTour";
import CardLocation from "../../components/CardLocation/CardLocation";
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
                <div
                  className={cx("list-search", open == true ? "open" : "")}
                ></div>
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
        <h2>Điểm đến yêu thích</h2>
        <div className={cx("list_location")}>
          <CardLocation
            name="Hà Nội"
            amount="17.000"
            url="https://i.pinimg.com/564x/90/18/68/901868d5cd433ee33ebff26a41af6948.jpg"
          ></CardLocation>
          <CardLocation
            name="Đà Nẵng"
            amount="17.000"
            url="https://i.pinimg.com/564x/7d/c2/b9/7dc2b90aeb23fba4fd4ed56c596b73aa.jpg"
          ></CardLocation>
          <CardLocation
            name="Phú Quốc"
            amount="17.000"
            url="https://i.pinimg.com/736x/ff/8d/c1/ff8dc1ecb5269399e00033fbc92e934c.jpg"
          ></CardLocation>
          <CardLocation
            name="Đà Lạt"
            amount="17.000"
            url="https://i.pinimg.com/564x/03/eb/2c/03eb2c14d9af611d8dc6ed0e8bcf79ad.jpg"
          ></CardLocation>
          <CardLocation
            name="Hồ Chí Minh"
            amount="17.000"
            url="https://i.pinimg.com/564x/ae/17/d8/ae17d8585b8d214ea2398b3ab17f1e31.jpg"
          ></CardLocation>
        </div>
      </section>
      <section className={cx("hot_tour")}>
        <h2>Tour ưu đãi</h2>
        <div className={cx("list_tour")}>
          <CardTour></CardTour>
          <CardTour></CardTour>
          <CardTour></CardTour>
          <CardTour></CardTour>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
