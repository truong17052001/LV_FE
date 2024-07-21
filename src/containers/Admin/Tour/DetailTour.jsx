import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Tour.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite
import { TagPicker, Button, Input, TagInput } from "rsuite";
import "rsuite/SelectPicker/styles/index.css";
import "rsuite/Button/styles/index.css";
import "rsuite/DatePicker/styles/index.css";
import "rsuite/TagPicker/styles/index.css";
import "rsuite/TagInput/styles/index.css";

// Services
import {
  getTourDetails,
  getHotels,
  getPlaces,
  getVehicles,
  updateTour,
} from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminDetailTour() {
  const [detailTours, setDetailTours] = useState({});
  const [hotel, setHotel] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [place, setPlace] = useState([]);

  const handleChange = (value, name) =>
    setDetailTours({ ...detailTours, [name]: value });

  const { id } = useParams();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateTour(id, detailTours);
      if (response.data.message === "Success") {
        window.location.href = "/admin/tour";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tourResponse, hotelResponse, placeResponse, vehicleResponse] =
          await Promise.all([
            getTourDetails(id),
            getHotels(),
            getPlaces(),
            getVehicles(),
          ]);

        if (tourResponse.data.data) {
          const { hotel, vehicle, place, images, ...restTourDetails } =
            tourResponse.data.data;
          setDetailTours({
            ...restTourDetails,
            hotel: hotel?.map((item) => item.maks) || [],
            vehicle: vehicle?.map((item) => item.mapt) || [],
            place: place?.map((item) => item.madd) || [],
            images: images?.map((item) => item.nguon) || [],
          });
        }
        if (hotelResponse.data.data) {
          setHotel(hotelResponse.data.data);
        }
        if (placeResponse.data.data) {
          setPlace(placeResponse.data.data);
        }
        if (vehicleResponse.data.data) {
          setVehicle(vehicleResponse.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);
  const hotels = hotel.map((item) => ({ label: item.ten, value: item.id }));
  const transportMeans = vehicle.map((item) => ({
    label: item.ten,
    value: item.id,
  }));
  const landmarks = place.map((item) => ({
    label: item.ten,
    value: item.id,
  }));

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <SideNav />
        <div className={cx("right")}>
          <div className={cx("box")}>
            <h3>Chi tiết tour</h3>
            <div className={cx("main")}>
              <div className={cx("info")}>
                <h5>Mã tour</h5>
                <Input
                  placeholder="Nhập mã tại đây"
                  value={detailTours.matour || ""}
                  onChange={(value) =>
                    setDetailTours((prev) => ({ ...prev, matour: value }))
                  }
                />
                <h5>Tiêu đề tour</h5>
                <Input
                  placeholder="Nhập tiêu đề tại đây"
                  value={detailTours.tieude || ""}
                  onChange={(value) =>
                    setDetailTours((prev) => ({ ...prev, tieude: value }))
                  }
                />
                <h5>Nơi tập trung</h5>
                <Input
                  placeholder="Nhập nơi tập trung tại đây"
                  value={detailTours.noikh || ""}
                  onChange={(value) =>
                    setDetailTours((prev) => ({ ...prev, noikh: value }))
                  }
                />
                <h5>Giá người lớn (VND)</h5>
                <Input
                  type="number"
                  placeholder="Nhập giá tour người lớn tại đây"
                  value={
                    isNaN(detailTours.gia_a) ? "" : parseInt(detailTours.gia_a)
                  }
                  onChange={(value) =>
                    setDetailTours((prev) => ({
                      ...prev,
                      gia_a: parseFloat(value),
                    }))
                  }
                />
                <h5>Giá trẻ em (VND)</h5>
                <Input
                  type="number"
                  placeholder="Nhập giá tour trẻ em tại đây"
                  value={
                    isNaN(detailTours.gia_c) ? "" : parseInt(detailTours.gia_c)
                  }
                  onChange={(value) =>
                    setDetailTours((prev) => ({
                      ...prev,
                      gia_c: parseFloat(value),
                    }))
                  }
                />
                <h5>Ảnh đại diện</h5>
                <Input
                  placeholder="Nhập link ảnh tại đây"
                  value={detailTours.anh || ""}
                  onChange={(value) =>
                    setDetailTours((prev) => ({ ...prev, anh: value }))
                  }
                />
                <h5>Ảnh phụ</h5>
                <TagInput
                  placeholder={"Nhập link ảnh tại đây"}
                  value={detailTours.images}
                  onChange={(value) => handleChange(value, "images")}
                  style={{ width: "100%" }}
                />
                <h5>Chú thích</h5>
                <Input
                  placeholder="Nhập chú thích tại đây"
                  value={detailTours.trangthai || ""}
                  onChange={(value) =>
                    setDetailTours((prev) => ({ ...prev, trangthai: value }))
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
                  <TagPicker
                    data={hotels}
                    searchable
                    value={detailTours.hotel}
                    style={{ width: "77%" }}
                    placeholder="Chọn khách sạn"
                    onChange={(value) => handleChange(value, "hotel")}
                  />
                  <Button color="green" appearance="primary">
                    Chọn
                  </Button>
                </div>
                <div className={cx("item")}>
                  <TagPicker
                    data={transportMeans}
                    searchable
                    value={detailTours.vehicle}
                    style={{ width: "77%" }}
                    placeholder="Chọn phương tiện vận chuyển"
                    onChange={(value) => handleChange(value, "vehicle")}
                  />
                  <Button color="green" appearance="primary">
                    Chọn
                  </Button>
                </div>
                <div className={cx("item")}>
                  <TagPicker
                    data={landmarks}
                    searchable
                    value={detailTours.place}
                    style={{ width: "77%" }}
                    placeholder="Chọn địa danh"
                    onChange={(value) => handleChange(value, "place")}
                  />
                  <Button color="green" appearance="primary">
                    Chọn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDetailTour;
