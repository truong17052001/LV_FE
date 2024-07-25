import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite

import { SelectPicker, Button, Input, DatePicker } from "rsuite";
import { format, parseISO } from "date-fns";

import "rsuite/SelectPicker/styles/index.css";
import "rsuite/Button/styles/index.css";
import "rsuite/DatePicker/styles/index.css";
import "rsuite/TagPicker/styles/index.css";
// Services
import { getBooking, updateBooking } from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminDetailBooking() {
  const [booking, setBooking] = useState({});
  const { id } = useParams();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateBooking(id, {
        ...booking,
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
        const [bookingResponse] = await Promise.all([getBooking(id)]);

        if (bookingResponse.data.data) {
          setBooking(bookingResponse.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);
  const listA = booking.detail || null;
  console.log(listA);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <SideNav />
        <div className={cx("right")}>
          <div className={cx("box")}>
            <h3>Chi tiết booking</h3>
            <div className={cx("main")}>
              <div className={cx("info")}>
                <h5>Họ tên</h5>
                <Input
                  placeholder="Nhập họ tên tại đây"
                  value={booking.ten || ""}
                  onChange={(value) =>
                    setBooking((prev) => ({ ...prev, ten: value }))
                  }
                />
                <h5>Địa chỉ</h5>
                <Input
                  placeholder="Nhập địa chỉ tại đây"
                  value={booking.diachi || ""}
                  onChange={(value) =>
                    setBooking((prev) => ({ ...prev, diachi: value }))
                  }
                />
                <h5>Số điện thoại</h5>
                <Input
                  type="number"
                  placeholder="Nhập giá tour tại đây"
                  value={booking.sdt}
                  onChange={(value) =>
                    setBooking((prev) => ({
                      ...prev,
                      sdt: value,
                    }))
                  }
                />
                <h5>Tổng tiền</h5>
                <Input
                  type="number"
                  placeholder="Nhập chi phí đặt chỗ tại đây"
                  value={booking.tongtien}
                  onChange={(value) =>
                    setBooking((prev) => ({
                      ...prev,
                      tongtien: value,
                    }))
                  }
                />
                <h5>Email</h5>
                <Input
                  placeholder="Nhập email tại đây"
                  value={booking.email || ""}
                  onChange={(value) =>
                    setBooking((prev) => ({ ...prev, email: value }))
                  }
                />
                <h5>Trạng thái</h5>
                <Input
                  placeholder="Nhập chú thích tại đây"
                  value={booking.trangthai || ""}
                  onChange={(value) =>
                    setBooking((prev) => ({ ...prev, trangthai: value }))
                  }
                />
                {/* <Button
                  color="green"
                  appearance="primary"
                  onClick={handleUpdate}
                >
                  Lưu
                </Button> */}
              </div>
            </div>
          </div>
        </div>
        <div className={cx("right")}>
          <div className={cx("box")}>
            <h3>Danh sách booking</h3>
            <div className={cx("main")}>
              <div className={cx("info")}>
                {listA != null
                  ? listA.map((value) => {
                      if (value.loai == 1) {
                        return (
                          <div>
                            <h5>Người lớn</h5>
                            <h5>Họ và tên</h5>
                            <Input
                              style={{ width: 350 }}
                              block
                              value={value.ten}
                              placeholder={"Nhập họ tên"}
                              onChange={(value) => {
                                setDetailBooking((prevState) => {
                                  const newState = { ...prevState };
                                  const newAdults = [...newState.adults];
                                  if (i >= 0 && i < newAdults.length) {
                                    newAdults[i] = {
                                      ...newAdults[i],
                                      ten: value,
                                    };
                                  } else {
                                    newAdults.push({ ten: value });
                                  }
                                  newState.adults = newAdults;
                                  return newState;
                                });
                              }}
                            />
                            <h5>Giới tính</h5>
                            <SelectPicker
                              data={[
                                { label: "Nam", value: "Nam" },
                                { label: "Nữ", value: "Nữ" },
                              ]}
                              style={{ width: 150 }}
                              searchable={false}
                              block
                              value={value.gioitinh}
                              placeholder={"Giới tính"}
                              onChange={(value) => {
                                setDetailBooking((prevState) => {
                                  const newState = { ...prevState };
                                  const newAdults = [...newState.adults];
                                  if (i >= 0 && i < newAdults.length) {
                                    newAdults[i] = {
                                      ...newAdults[i],
                                      gioitinh: value,
                                    };
                                  } else {
                                    newAdults.push({ gioitinh: value });
                                  }
                                  newState.adults = newAdults;
                                  return newState;
                                });
                              }}
                            />
                            <h5>Ngày sinh</h5>
                            <div>
                              <DatePicker
                                format="yyyy-MM-dd"
                                placeholder="Chọn ngày ngày sinh"
                                block
                                value={parseISO(value.ngaysinh)}
                                onChange={(value) => {
                                  setDetailBooking((prevState) => {
                                    const newState = { ...prevState };
                                    const newAdults = [...newState.adults];
                                    if (i >= 0 && i < newAdults.length) {
                                      newAdults[i] = {
                                        ...newAdults[i],
                                        ngaysinh: format(value, "yyyy-MM-dd"),
                                      };
                                    } else {
                                      newAdults.push({
                                        ngaysinh: format(value, "yyyy-MM-dd"),
                                      });
                                    }
                                    newState.adults = newAdults;
                                    return newState;
                                  });
                                }}
                              />
                            </div>
                          </div>
                        );
                      } else{
                        return (
                          <div>
                            <h5>Trẻ em</h5>
                            <h5>Họ và tên</h5>
                            <Input
                              style={{ width: 350 }}
                              block
                              value={value.ten}
                              placeholder={"Nhập họ tên"}
                              onChange={(value) => {
                                setDetailBooking((prevState) => {
                                  const newState = { ...prevState };
                                  const newAdults = [...newState.adults];
                                  if (i >= 0 && i < newAdults.length) {
                                    newAdults[i] = {
                                      ...newAdults[i],
                                      ten: value,
                                    };
                                  } else {
                                    newAdults.push({ ten: value });
                                  }
                                  newState.adults = newAdults;
                                  return newState;
                                });
                              }}
                            />
                            <h5>Giới tính</h5>
                            <SelectPicker
                              data={[
                                { label: "Nam", value: "Nam" },
                                { label: "Nữ", value: "Nữ" },
                              ]}
                              style={{ width: 150 }}
                              searchable={false}
                              block
                              value={value.gioitinh}
                              placeholder={"Giới tính"}
                              onChange={(value) => {
                                setDetailBooking((prevState) => {
                                  const newState = { ...prevState };
                                  const newAdults = [...newState.adults];
                                  if (i >= 0 && i < newAdults.length) {
                                    newAdults[i] = {
                                      ...newAdults[i],
                                      gioitinh: value,
                                    };
                                  } else {
                                    newAdults.push({ gioitinh: value });
                                  }
                                  newState.adults = newAdults;
                                  return newState;
                                });
                              }}
                            />
                            <h5>Ngày sinh</h5>
                            <div>
                              <DatePicker
                                format="yyyy-MM-dd"
                                placeholder="Chọn ngày ngày sinh"
                                block
                                value={parseISO(value.ngaysinh)}
                                onChange={(value) => {
                                  setDetailBooking((prevState) => {
                                    const newState = { ...prevState };
                                    const newAdults = [...newState.adults];
                                    if (i >= 0 && i < newAdults.length) {
                                      newAdults[i] = {
                                        ...newAdults[i],
                                        ngaysinh: format(value, "yyyy-MM-dd"),
                                      };
                                    } else {
                                      newAdults.push({
                                        ngaysinh: format(value, "yyyy-MM-dd"),
                                      });
                                    }
                                    newState.adults = newAdults;
                                    return newState;
                                  });
                                }}
                              />
                            </div>
                          </div>
                        );
                      }
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDetailBooking;
