import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Tour.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite
import { TagPicker, Button, Input, useToaster, Message } from "rsuite";
import "rsuite/SelectPicker/styles/index.css";
import "rsuite/Button/styles/index.css";
import "rsuite/DatePicker/styles/index.css";
import "rsuite/TagPicker/styles/index.css";
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
  const [detailTours, setDetailTours] = useState({
    code: "",
    title_tour: "",
    meet_place: "",
    price: 0,
    img_tour: "",
    note: "",
  });
  const [hotel, setHotel] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [place, setPlace] = useState([]);
  const [selectedHotels, setSelectedHotels] = useState([]);

  const handleSelect = (value) => setSelectedHotels(value);

  const { id } = useParams();
  const toaster = useToaster();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateTour(id, {
        ...detailTours,
      });
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
          setDetailTours(tourResponse.data.data);
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

  const hotels = hotel.map((item) => ({ label: item.name, value: item.id }));
  const transportMeans = vehicle.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const landmarks = place.map((item) => ({
    label: item.name_place,
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
                  value={detailTours.code || ""}
                  onChange={(value) =>
                    setDetailTours((prev) => ({ ...prev, code: value }))
                  }
                />
                <h5>Tiêu đề tour</h5>
                <Input
                  placeholder="Nhập tiêu đề tại đây"
                  value={detailTours.title_tour || ""}
                  onChange={(value) =>
                    setDetailTours((prev) => ({ ...prev, title_tour: value }))
                  }
                />
                <h5>Nơi tập trung</h5>
                <Input
                  placeholder="Nhập nơi tập trung tại đây"
                  value={detailTours.meet_place || ""}
                  onChange={(value) =>
                    setDetailTours((prev) => ({ ...prev, meet_place: value }))
                  }
                />
                <h5>Giá tour (VND)</h5>
                <Input
                  type="number"
                  placeholder="Nhập giá tour tại đây"
                  value={
                    isNaN(detailTours.price) ? "" : parseInt(detailTours.price)
                  }
                  onChange={(value) =>
                    setDetailTours((prev) => ({
                      ...prev,
                      price: parseFloat(value),
                    }))
                  }
                />
                <h5>Ảnh</h5>
                <Input
                  placeholder="Nhập link ảnh tại đây"
                  value={detailTours.img_tour || ""}
                  onChange={(value) =>
                    setDetailTours((prev) => ({ ...prev, img_tour: value }))
                  }
                />
                <h5>Chú thích</h5>
                <Input
                  placeholder="Nhập chú thích tại đây"
                  value={detailTours.note || ""}
                  onChange={(value) =>
                    setDetailTours((prev) => ({ ...prev, note: value }))
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
                    style={{ width: "77%" }}
                    onChange={handleSelect}
                    placeholder="Chọn khách sạn"
                  />
                  <Button color="green" appearance="primary">
                    Chọn
                  </Button>
                </div>
                <div className={cx("item")}>
                  <TagPicker
                    data={transportMeans}
                    searchable
                    style={{ width: "77%" }}
                    onChange={handleSelect}
                    placeholder="Chọn phương tiện vận chuyển"
                  />
                  <Button
                    color="green"
                    appearance="primary"
                    onClick={() =>
                      toaster.push(
                        <Message showIcon type="success" closable>
                          Thành công
                        </Message>,
                        { placement: "topEnd", duration: 2000 }
                      )
                    }
                  >
                    Chọn
                  </Button>
                </div>
                <div className={cx("item")}>
                  <TagPicker
                    data={landmarks}
                    searchable
                    style={{ width: "77%" }}
                    onChange={handleSelect}
                    placeholder="Chọn địa danh"
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
