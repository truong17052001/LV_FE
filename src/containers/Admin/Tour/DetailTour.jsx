import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Tour.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite
import { SelectPicker } from "rsuite";
import { Button } from "rsuite";
import { DatePicker } from "rsuite";
import isBefore from "date-fns/isBefore";

import "rsuite/SelectPicker/styles/index.css";
import "rsuite/Button/styles/index.css";
import "rsuite/DatePicker/styles/index.css";

const cx = classNames.bind(styles);

function AdminDetailTour() {
  const [tours, setTours] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/client/tour/${id}`
        );
        if (response.data.data != null) {
          setTours(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDetail();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <SideNav></SideNav>
        <div className={cx("right")}>
          <div className={cx("box")}>
            <h3>Chi tiết tour</h3>
            <div className={cx("main")}>
              <div className={cx("info")}>
                <div className={cx("item")}>
                  <label>Mã tour:</label>
                  <p>{tours.code}</p>
                </div>
                <div className={cx("item")}>
                  <label>Tiêu đề tour:</label>
                  <p>{tours.title_tour}</p>
                </div>
                <div className={cx("item")}>
                  <label>Giá tour:</label>
                  <p>{tours.price} VND</p>
                </div>
                <div className={cx("item")}>
                  <label>Nơi tập trung:</label>
                  <p>{tours.meet_place}</p>
                </div>
                <div className={cx("item")}>
                  <label>Phân loại:</label>
                  <p>{tours.note}</p>
                </div>
                <div className={cx("item")}>
                  <img src={tours.img_tour}></img>
                </div>
              </div>
              <div className={cx("others")}>
                <h4>Thông tin bổ sung</h4>
                <SelectPicker
                  searchable={true}
                  placeholder="Chọn hướng dẫn viên"
                />
                <DatePicker
                  format="dd.MM.yyyy"
                  placeholder="Chọn ngày đi"
                  shouldDisableDate={(date) => isBefore(date, new Date())}
                />
                <SelectPicker searchable={true} placeholder="Chọn khách sạn" />
                <SelectPicker
                  searchable={true}
                  placeholder="Chọn phương tiện vận chuyển"
                />
                <SelectPicker searchable={true} placeholder="Chọn địa danh" />
                <Button color="green" appearance="primary">
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDetailTour;
