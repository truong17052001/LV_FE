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
import { Input } from "rsuite";
import isBefore from "date-fns/isBefore";

import "rsuite/SelectPicker/styles/index.css";
import "rsuite/Button/styles/index.css";
import "rsuite/DatePicker/styles/index.css";
//icon

const cx = classNames.bind(styles);

function AdminDetailTour() {
  const [detailTours, setDetailTours] = useState([]);
  const [guiders, setGuiders] = useState([]);
  const { id } = useParams();
  console.log(detailTours);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/client/tour/edit/${id}`,
        {
          code: detailTours.code,
          title_tour: detailTours.title_tour,
          meet_place: detailTours.meet_place,
          price: detailTours.price.toFixed(2),
          img_tour: detailTours.img_tour,
          note: detailTours.note,
        }
      );
      if (response.data.message == "Success") {
        window.location.href = "/admin/tour";
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/client/tour/${id}`
        );
        if (response.data.data != null) {
          setDetailTours(response.data.data);
        }
        const response1 = await axios.get(
          `http://127.0.0.1:8000/api/client/guider`
        );
        if (response1.data.data != null) {
          setGuiders(response1.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDetail();
  }, []);
  const hotels = [
    "Khách sạn Hòa Bình",
    "Khách sạn Sài Gòn",
    "Khách sạn Đà Nẵng",
    "Khách sạn Hà Nội",
    "Khách sạn Vũng Tàu",
    "Khách sạn Nha Trang",
    "Khách sạn Huế",
    "Khách sạn Phú Quốc",
    "Khách sạn Quy Nhơn",
    "Khách sạn Đà Lạt",
  ].map((item) => ({ label: item, value: item }));
  const transportMeans = [
    "Xe ô tô",
    "Xe máy",
    "Xe đạp",
    "Tàu hỏa",
    "Máy bay",
    "Tàu thủy",
    "Xe buýt",
    "Xe khách",
    "Taxi",
    "Xe điện",
  ].map((item) => ({ label: item, value: item }));
  const landmarks = [
    "Vịnh Hạ Long",
    "Đảo Phú Quốc",
    "Tháp Rùa",
    "Chùa Một Cột",
    "Núi Bà Đen",
    "Hang Sơn Đoòng",
    "Đà Lạt",
    "Hội An",
    "Thành phố Hồ Chí Minh",
    "Cố đô Huế",
  ].map((item) => ({ label: item, value: item }));
  const tourGuider = guiders.map(
    item => ({ label: item.name, value: item })
  );
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <SideNav></SideNav>
        <div className={cx("right")}>
          <div className={cx("box")}>
            <h3>Chi tiết tour</h3>
            <div className={cx("main")}>
              <div className={cx("info")}>
                <h5>Mã tour</h5>
                <Input
                  placeholder={"Nhập mã tại đây"}
                  value={detailTours.code}
                  onChange={(value) =>
                    setDetailTours((preState) => ({
                      ...preState,
                      code: value,
                    }))
                  }
                />
                <h5>Tiêu đề tour</h5>
                <Input
                  placeholder={"Nhập tiêu đề tại đây"}
                  value={detailTours.title_tour}
                  onChange={(value) =>
                    setDetailTours((preState) => ({
                      ...preState,
                      title_tour: value,
                    }))
                  }
                />
                <h5>Nơi tập trung</h5>
                <Input
                  placeholder={"Nhập nơi tập trung tại đây"}
                  value={detailTours.meet_place}
                  onChange={(value) =>
                    setDetailTours((preState) => ({
                      ...preState,
                      meet_place: value,
                    }))
                  }
                />
                <h5>Giá tour ( VND )</h5>
                {console.log(detailTours.price)}
                <Input
                  type="number"
                  placeholder={"Nhập giá tour tại đây"}
                  value={parseInt(detailTours.price, 10)}
                  onChange={(value) =>
                    setDetailTours((preState) => ({
                      ...preState,
                      price: parseInt(value, 10),
                    }))
                  }
                />
                <h5>Ảnh</h5>
                <Input
                  placeholder={"Nhập link ảnh tại đây"}
                  value={detailTours.img_tour}
                  onChange={(value) =>
                    setDetailTours((preState) => ({
                      ...preState,
                      img_tour: value,
                    }))
                  }
                />
                <h5>Chú thích</h5>
                <Input
                  placeholder={"Nhập chú thích tại đây"}
                  value={detailTours.note}
                  onChange={(value) =>
                    setDetailTours((preState) => ({
                      ...preState,
                      note: value,
                    }))
                  }
                />
                <Button
                  color="green"
                  appearance="primary"
                  onClick={handleUpdate}
                >
                  Lưu
                </Button>
              </div>
              <div className={cx("others")}>
                <h4>Thông tin bổ sung</h4>
                <div className={cx("item")}>
                  <SelectPicker
                    data={tourGuider}
                    searchable={true}
                    style={{ width: '77%' }}
                    placeholder="Chọn hướng dẫn viên"
                  />
                  <Button color="green" appearance="primary">
                    Chọn
                  </Button>
                </div>
                <div className={cx("item")}>
                  <DatePicker
                    format="dd.MM.yyyy"
                    placeholder="Chọn ngày đi"
                    style={{ width: '77%' }}
                    shouldDisableDate={(date) => isBefore(date, new Date())}
                  />
                  <Button color="green" appearance="primary">
                    Chọn
                  </Button>
                </div>
                <div className={cx("item")}>
                  <SelectPicker
                    data={hotels}
                    searchable={true}
                    style={{ width: '77%' }}
                    placeholder="Chọn khách sạn"
                  />
                  <Button color="green" appearance="primary">
                    Chọn
                  </Button>
                </div>
                <div className={cx("item")}>
                  <SelectPicker
                    data={transportMeans}
                    searchable={true}
                    style={{ width: '77%' }}
                    placeholder="Chọn phương tiện vận chuyển"
                  />
                  <Button color="green" appearance="primary">
                    Chọn
                  </Button>
                </div>

                <SelectPicker
                  data={landmarks}
                  searchable={true}
                  placeholder="Chọn địa danh"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDetailTour;
