import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
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
  Button,
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
import TagFilterIcon from "@rsuite/icons/TagFilter";
//api
import { getPlaces, getTours } from "../../core/services/apiServices";
const cx = classNames.bind(styles);

function TourPage() {
  const [tours, setTours] = useState([]);
  const [places, setPlaces] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState(10);
  const [limit, setLimit] = useState(9);
  const [search, setSearch] = useState([]);

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const id_location = urlParams.get("diemden");
  const place = places.map((place) => ({
    label: place.ten,
    value: place.id,
  }));

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
      } else {
        toast.warn("Không tìm thấy tour nào phù hợp với yêu cầu của quý khách");
      }
      const placesResponse = await getPlaces();
      if (placesResponse.data.data) {
        setPlaces(placesResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  const limitOptions = [9, 15, 21];
  const handleFilter = () => {
    const params = {
      page: 1,
      limit: limit,
      ...search,
    };
    fetchTours(params);
  };
  useEffect(() => {
    const params = {
      page: activePage,
      limit: limit,
      ...search,
    };
    fetchTours(params);
  }, [activePage]);
  // console.log(search.diemden);
  useEffect(() => {
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
                  <SelectPicker
                    data={place}
                    size="lg"
                    placeholder="Chọn điểm đến"
                    block
                    onChange={(value) => {
                      setSearch((preState) => ({
                        ...preState,
                        diemden: value,
                      }));
                    }}
                  />
                </div>
                <div className={cx("mb")}>
                  <h5> Số ngày</h5>
                  <Input
                    type="number"
                    size="lg"
                    placeholder="Nhập số ngày đi"
                    block
                    onChange={(value) => {
                      setSearch((preState) => ({
                        ...preState,
                        songay: value,
                      }));
                    }}
                  />
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
                <div className={cx("mb")}>
                  <h5> Ngân sách của quý khách</h5>
                  {/* <div className={cx("p")}> */}
                  Giá thấp nhất:
                  <Input
                    type="number"
                    size="lg"
                    placeholder="Giá thấp nhất"
                    value={search.giamin}
                    onChange={(value) => {
                      setSearch((preState) => ({
                        giamin: value,
                      }));
                    }}
                  />
                  Giá cao nhất
                  <Input
                    type="number"
                    size="lg"
                    placeholder="Giá cao nhất"
                    value={search.giamax}
                    onChange={(value) => {
                      setSearch((preState) => ({
                        ...preState,
                        giamax: value,
                      }));
                    }}
                  />
                  {/* </div> */}
                </div>
                {/* <div className={cx("mb")}>
                  <h5> Hiển thị những chuyến đi có</h5>
                  <div className={cx("group")}>
                    <Toggle></Toggle> Khuyến mãi
                    <Toggle></Toggle> Còn chỗ
                  </div>
                </div> */}
                <div className={cx("mb")}>
                  <Button
                    color="red"
                    appearance="primary"
                    block
                    startIcon={<TagFilterIcon />}
                    onClick={handleFilter}
                  >
                    Lọc
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("right")}>
            {id_location != null || search.diemden != null
              ? places.map((value, index) => {
                  if (value.id == id_location) {
                    return (
                      <div className={cx("info")}>
                        <h1>{value.ten}</h1>
                        <div className={cx("description")}>
                          <p>{value.mota}</p>
                        </div>
                      </div>
                    );
                  }
                })
              : ""}
            {/* <div className={cx("orther")}>
              <div>Đã tìm thấy tours cho Quý khách.</div>
              <div>
                Sắp xếp theo
                <SelectPicker
                  data={places}
                  size="lg"
                  placeholder="Tất cả"
                  searchable={false}
                />
              </div>
            </div> */}
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
                        state={tour.trangthai}
                        date={tour.date_go}
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
