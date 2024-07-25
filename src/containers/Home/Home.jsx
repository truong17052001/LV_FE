import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CardTour from "../../components/CardTour/CardTour";
import CardLocation from "../../components/CardLocation/CardLocation";
//rsuite
import isBefore from "date-fns/isBefore";
import { parseISO, format } from "date-fns";
import { SelectPicker, DatePicker, Input } from "rsuite";
import "rsuite/SelectPicker/styles/index.css";
import "rsuite/DatePicker/styles/index.css";

//icon
import { FaSearch } from "react-icons/fa";
//api
import {
  getPlaces,
  getTours,
  resultPayment,
} from "../../core/services/apiServices";
const cx = classNames.bind(styles);

function HomePage() {
  const data = ["Dưới 5tr", "Từ 5-10tr", "Từ 10-20tr", "Trên 20tr"].map(
    (item) => ({
      label: item,
      value: item,
    })
  );
  const location = useLocation();

  const [tours, setTours] = useState([]);
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState([]);
  const params = {
    page: 1,
    limit: 4,
    ...search,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesResponse = await getPlaces();
        if (placesResponse.data.data) {
          setPlaces(placesResponse.data.data);
        }
        const toursResponse = await getTours(params);
        if (toursResponse.data.data) {
          setTours(toursResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const locations = places.map((place) => ({
    label: place.ten,
    value: place.id,
  }));
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const extraData = queryParams.get("extraData");
    const resultCode = queryParams.get("resultCode");
    if (extraData != null) {
      const checkPaymentStatus = async () => {
        try {
          const response = await resultPayment({
            extraData: extraData,
            resultCode: resultCode,
          });
        } catch (error) {
          console.error("Error checking payment status:", error);
        }
      };
      checkPaymentStatus();
    }
  }, [location.search]);

  const handleSearch = () => {
    const searchParams = new URLSearchParams(search).toString();
    window.location.href = `/tour?${searchParams}`;
  };

  return (
    <div className={cx("wrapper")}>
      <Header type={1}></Header>
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
          <div className={cx("form-search")}>
            <div className={cx("box-search")}>
              Tên tour
              <Input
                size="lg"
                placeholder="Nhập tên tour"
                onChange={(value) => {
                  setSearch((preState) => ({
                    ...preState,
                    tieude: value,
                  }));
                }}
              />
            </div>
            <div className={cx("box-search")}>
              Điểm đến
              <SelectPicker
                data={locations}
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
            <div className={cx("box-search")}>
              Ngày khởi hành
              <DatePicker
                format="yyyy-MM-dd"
                placeholder="Chọn ngày khởi hành"
                shouldDisableDate={(date) => isBefore(date, new Date())}
                onChange={(value) => {
                  setSearch((preState) => ({
                    ...preState,
                    ngaydi: format(value, "yyyy-MM-dd"),
                  }));
                }}
              />
            </div>
            <div className={cx("box-search")}>
              Giá tour
              <SelectPicker
                data={data}
                size="lg"
                placeholder="Tất cả"
                searchable={false}
                onChange={(value) => {
                  switch (value) {
                    case "Dưới 5tr":
                      return setSearch((preState) => ({
                        ...preState,
                        giamin: 0,
                        giamax: 5000000,
                      }));
                    case "Từ 5-10tr":
                      return setSearch((preState) => ({
                        ...preState,
                        giamin: 5000000,
                        giamax: 10000000,
                      }));
                    case "Từ 10-20tr":
                      return setSearch((preState) => ({
                        ...preState,
                        giamin: 10000000,
                        giamax: 20000000,
                      }));
                    case "Trên 20tr":
                      return setSearch((preState) => ({
                        ...preState,
                        giamin: 5000000,
                        giamax: 10000000,
                      }));
                    default:
                      return setSearch((preState) => ({
                        ...preState,
                        // giamin: 0,
                        // giamax: 5000000,
                      }));
                  }
                }}
              />
            </div>
            <button className={cx("btn-search")} onClick={handleSearch}>
              <FaSearch />
              <p>Tìm kiếm</p>
            </button>
          </div>
        </div>
      </section>
      <section className={cx("hot_location")}>
        <h2>Điểm đến yêu thích</h2>
        <div className={cx("list_location")}>
          {places.map((value, index) => {
            console.log(value, index);
            if (index < 5) {
              return (
                <CardLocation
                  id={value.id}
                  name={value.ten}
                  amount="17.000"
                  url={value.anh}
                ></CardLocation>
              );
            }
          })}
          {/* 
            url="https://i.pinimg.com/564x/90/18/68/901868d5cd433ee33ebff26a41af6948.jpg"
            url="https://i.pinimg.com/564x/7d/c2/b9/7dc2b90aeb23fba4fd4ed56c596b73aa.jpg"
            url="https://i.pinimg.com/736x/ff/8d/c1/ff8dc1ecb5269399e00033fbc92e934c.jpg"
            url="https://i.pinimg.com/564x/03/eb/2c/03eb2c14d9af611d8dc6ed0e8bcf79ad.jpg"
            url="https://i.pinimg.com/564x/ae/17/d8/ae17d8585b8d214ea2398b3ab17f1e31.jpg" */}
        </div>
      </section>
      <section className={cx("hot_tour")}>
        <h2>Tour ưu đãi</h2>
        <div className={cx("list_tour")}>
          {tours.map((tour, index) => {
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
              ></CardTour>
            );
          })}
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
