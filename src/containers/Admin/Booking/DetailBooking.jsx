import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite
import { Button, Input } from "rsuite";
import "rsuite/SelectPicker/styles/index.css";
import "rsuite/Button/styles/index.css";
import "rsuite/DatePicker/styles/index.css";
import "rsuite/TagPicker/styles/index.css";
// Services
import { getBooking, updateBooking } from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminDetailBooking() {
  const [detailBooking, setDetailBooking] = useState({
    code: "",
    title_tour: "",
    meet_place: "",
    price: 0,
    img_tour: "",
    note: "",
  });
  const { id } = useParams();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateBooking(id, {
        ...detailBooking,
      });
      if (response.data.message === "Success") {
        window.location.href = "/admin/booking";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tourResponse] = await Promise.all([getBooking(id)]);

        if (tourResponse.data.data) {
          setDetailBooking(tourResponse.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

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
                  value={detailBooking.ngay || ""}
                  onChange={(value) =>
                    setDetailBooking((prev) => ({ ...prev, code: value }))
                  }
                />
                <h5>Tiêu đề tour</h5>
                <Input
                  placeholder="Nhập tiêu đề tại đây"
                  value={detailBooking.ten || ""}
                  onChange={(value) =>
                    setDetailBooking((prev) => ({ ...prev, title_tour: value }))
                  }
                />
                <h5>Nơi tập trung</h5>
                <Input
                  placeholder="Nhập nơi tập trung tại đây"
                  value={detailBooking.diachi || ""}
                  onChange={(value) =>
                    setDetailBooking((prev) => ({ ...prev, meet_place: value }))
                  }
                />
                <h5>Giá tour (VND)</h5>
                <Input
                  type="number"
                  placeholder="Nhập giá tour tại đây"
                  value={detailBooking.sdt}
                  onChange={(value) =>
                    setDetailBooking((prev) => ({
                      ...prev,
                      price: parseFloat(value),
                    }))
                  }
                />
                <h5>Ảnh</h5>
                <Input
                  placeholder="Nhập link ảnh tại đây"
                  value={detailBooking.email || ""}
                  onChange={(value) =>
                    setDetailBooking((prev) => ({ ...prev, img_tour: value }))
                  }
                />
                <h5>Chú thích</h5>
                <Input
                  placeholder="Nhập chú thích tại đây"
                  value={detailBooking.note || ""}
                  onChange={(value) =>
                    setDetailBooking((prev) => ({ ...prev, note: value }))
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDetailBooking;
