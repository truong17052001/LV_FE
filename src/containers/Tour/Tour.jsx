import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Tour.module.scss";
//rsuite
import {
  DatePicker,
  SelectPicker,
  RangeSlider,
  Pagination,
  Input,
} from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import "rsuite/SelectPicker/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import "rsuite/Pagination/styles/index.css";
import "rsuite/Toggle/styles/index.css";
import isBefore from "date-fns/isBefore";
import { parseISO, format } from "date-fns";
//component
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CardTour from "../../components/CardTour/CardTour";
//icon

//api
import { getPlaces, getTours } from "../../core/services/apiServices";
const cx = classNames.bind(styles);

function TourPage() {
  const [value, setValue] = useState([0, 7000000]);
  const [tours, setTours] = useState([]);
  const [places, setPlaces] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState(10);
  const [limit, setLimit] = useState(9);
  const [search, setSearch] = useState([]);

  const fetchTours = async (params) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/client/tour",
        { params: params }
      );
      if (response.data.data) {
        setTours(response.data.data);
        setTotal(
          response.data.paginate.limit * response.data.paginate.total_page
        );
      }
      const placesResponse = await getPlaces();
      if (placesResponse.data.data) {
        setPlaces(
          placesResponse.data.data.map((place) => ({
            label: place.ten,
            value: place.id,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  const limitOptions = [9, 15, 21];

  useEffect(() => {
    const params = {
      page: activePage,
      limit: limit,
      ...search,
    };
    fetchTours(params);
  }, [activePage, limit, search]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", activePage);
    urlParams.set("limit", limit);
    fetchTours(urlParams);
  }, []);

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
              {/* <div className={cx("heading")}>
                <span>Đà Lạt</span>
              </div> */}
              <div className={cx("input")}>
                {/* <div className={cx("mb")}>
                  <h5>Điểm đi</h5>
                  <div>
                    <SelectPicker
                      data={data}
                      size="lg"
                      placeholder="Tất cả"
                      block
                    />
                  </div>
                </div> */}
                <div className={cx("mb")}>
                  <h5> Điểm đến</h5>
                  <div>
                    <SelectPicker
                      data={places}
                      size="lg"
                      placeholder="Chọn điểm đến"
                      onChange={(value) => {
                        setSearch((preState) => ({
                          ...preState,
                          diemden: value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className={cx("mb")}>
                  <h5> Số ngày</h5>
                  <div className={cx("group")}>
                    <Input
                      type="number"
                      size="lg"
                      placeholder="Nhập số ngày đi"
                      onChange={(value) => {
                        setSearch((preState) => ({
                          ...preState,
                          songay: value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className={cx("mb")}>
                  <h5>Ngày đi</h5>
                  <DatePicker
                    format="yyyy-MM-dd"
                    placeholder="Chọn ngày khởi hành"
                    shouldDisableDate={(date) => isBefore(date, new Date())}
                    onChange={(value) => {
                      if (value) {
                        setSearch((prevState) => ({
                          ...prevState,
                          ngaydi: format(value, "yyyy-MM-dd"),
                        }));
                      } else {
                        setSearch((prevState) => ({
                          ...prevState,
                          ngaydi: null,
                        }));
                      }
                    }}
                  />
                </div>
                <div className={cx("mb")}>
                  <h5> Số người</h5>
                  <div className={cx("group")}>
                    <Input
                      type="number"
                      size="lg"
                      placeholder="Nhập số người"
                      onChange={(value) => {
                        setSearch((preState) => ({
                          ...preState,
                          songuoi: value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className={cx("mb")}>
                  <h5> Ngân sách của quý khách</h5>
                  <div className={cx("p")}>
                    <RangeSlider
                      progress
                      value={value}
                      step={100000}
                      min={0}
                      max={10000000}
                      onChange={(value) => {
                        setValue(value);
                        setSearch((preState) => ({
                          ...preState,
                          giamin: value[0],
                          giamax: value[1],
                        }));
                      }}
                    />
                    <p>
                      {value[0]} ₫ - {value[1]} ₫
                    </p>
                  </div>
                </div>
                {/* <div className={cx("mb")}>
                  <h5> Hiển thị những chuyến đi có</h5>
                  <div className={cx("group")}>
                    <Toggle></Toggle> Khuyến mãi
                    <Toggle></Toggle> Còn chỗ
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className={cx("right")}>
            <div className={cx("info")}>
              <h1>Du lịch TP. Hồ Chí Minh</h1>
              <div className={cx("description")}>
                <p>
                  Du lịch đến với thành phố Hồ Chí Minh bạn có thể gặp những tòa
                  nhà cao tầng nằm san sát, những khu vui chơi giải trí, trung
                  tâm mua sắm sầm uất, nhưng cũng không thiếu những biệt thự cổ
                  kính, những ngôi chợ truyền thống. Sài Gòn rộng lớn và không
                  thiếu những “đặc sản” du lịch như du ngoạn ven sông Sài Gòn
                  bằng tàu, thăm phố Tây Phạm Ngũ Lão, mua sắm ở chợ Bến Thành
                  hay về với biển Cần Giờ.
                </p>
                <p>
                  Đăng ký tour TP. Hồ Chí Minhcùng Vietravel, Quý khách có thể
                  đến khám phá các điểm đến nổi bật sau: Củ Chi, Địa đạo Củ Chi,
                  KDL Nông Trang Xanh, Cần Giờ, Bưu điện Trung tâm TP. Hồ Chí
                  Minh, ...
                </p>
                <p>
                  Để hiểu hơn về TP. Hồ Chí Minh Mời Quý khách tham khảo Kinh
                  nghiệm du lịch TP. Hồ Chí Minh
                </p>
              </div>
            </div>
            <div className={cx("orther")}>
              <div>Đã tìm thấy 78 tours cho Quý khách.</div>
              <div>
                Sắp xếp theo
                <SelectPicker
                  data={places}
                  size="lg"
                  placeholder="Tất cả"
                  searchable={false}
                />
              </div>
            </div>
            <div className={cx("list")}>
              {tours.length
                ? tours.map((tour, index) => {
                    return (
                      <CardTour
                        key={index}
                        id={tour.id}
                        code={tour.matour}
                        title_tour={tour.tieude}
                        meet_place={tour.noikh}
                        price={tour.gia_a}
                        img_tour={tour.anh}
                      ></CardTour>
                    );
                  })
                : ""}
            </div>
            <div className={cx("pagination")}>
              <Pagination
                prev
                last
                next
                first
                size="lg"
                total={total}
                limit={9}
                onChangeLimit={setLimit}
                limitOptions={limitOptions}
                activePage={activePage}
                onChangePage={setActivePage}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default TourPage;
