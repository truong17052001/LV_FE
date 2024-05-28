import * as React from "react";
import classNames from "classnames/bind";
import styles from "./Tour.module.scss";
//rsuite
import { DatePicker, SelectPicker, RangeSlider } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import "rsuite/SelectPicker/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
//component
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Switch from "../../components/Switch/Switch";
//icon

const cx = classNames.bind(styles);

function TourPage() {
  const [value, setValue] = React.useState([0, 7000000]);

  const data = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng"].map((item) => ({
    label: item,
    value: item,
  }));
  return (
    <div className={cx("wrapper")}>
      <Header type={2}></Header>
      <div className={cx("container")}>
        <div className={cx("breadcrumb")}>
          <a href="/">Trang chủ</a>\<a href="/">Tours</a>
        </div>
        <div className={cx("content")}>
          <div className={cx("filter")}>
            <div className={cx("brand")}>
              <h2>Bộ lọc tìm kiếm</h2>
            </div>
            <div className={cx("keyword")}>
              <div className={cx("heading")}>
                <span>Đà Lạt</span>
              </div>
              <div className={cx("input")}>
                <div className={cx("mb")}>
                  <h5>Điểm đi</h5>
                  <div>
                    <SelectPicker
                      data={data}
                      size="lg"
                      placeholder="Tất cả"
                      block
                    />
                  </div>
                </div>
                <div className={cx("mb")}>
                  <h5> Điểm đến</h5>
                  <div>
                    <SelectPicker
                      data={data}
                      size="lg"
                      placeholder="Chọn điểm đến"
                      block
                    />
                  </div>
                </div>
                <div className={cx("mb")}>
                  <h5> Số ngày</h5>
                  <div className={cx("group")}>
                    <button>1-3 ngày</button>
                    <button>4-7 ngày</button>
                    <button>8-14 ngày</button>
                    <button>14+ ngày</button>
                  </div>
                </div>
                <div className={cx("mb")}>
                  <h5>Ngày đi</h5>
                  <DatePicker
                    format="dd/MM/yyyy"
                    size="lg"
                    className={cx("cut")}
                  />
                </div>
                <div className={cx("mb")}>
                  <h5> Số người</h5>
                  <div className={cx("group")}>
                    <button>1 người</button>
                    <button>2 người</button>
                    <button>3-5 người</button>
                    <button>5+ người</button>
                  </div>
                </div>
                <div className={cx("mb")}>
                  <h5> Ngân sách của quý khách</h5>
                  <div>
                    <RangeSlider
                      progress
                      value={value}
                      step={1000}
                      min={0}
                      max={10000000}
                      onChange={(value) => {
                        setValue(value);
                      }}
                    />
                    <p>
                      {value[0]} ₫ - {value[1]} ₫
                    </p>
                  </div>
                </div>
                <div className={cx("mb")}>
                  <h5> Hiển thị những chuyến đi có</h5>
                  <div className={cx("group")}>
                    <Switch>Khuyến mãi</Switch>
                    <Switch>Còn chỗ</Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("list")}></div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default TourPage;
