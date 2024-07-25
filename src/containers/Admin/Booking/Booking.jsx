import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite
import {
  Modal,
  Button,
  Input,
  InputGroup,
  IconButton,
  TagPicker,
  SelectPicker,
  DatePicker,
} from "rsuite";
import { format, addDays, getMonth, getDate, getYear } from "date-fns";

import SearchIcon from "@rsuite/icons/Search";
import PlusIcon from "@rsuite/icons/Plus";
import MinusIcon from "@rsuite/icons/Minus";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import "rsuite/Modal/styles/index.css";
import "rsuite/Input/styles/index.css";
import "rsuite/InputGroup/styles/index.css";
import "rsuite/IconButton/styles/index.css";
import "rsuite/TagPicker/styles/index.css";
// Services
import {
  getDates,
  getBookings,
  addBooking,
  deleteBooking,
  getUsers,
} from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [newBooking, setNewBooking] = useState({
    ngay: format(new Date(), "yyyy-MM-dd"),
    makh: null,
  });
  const [detailBooking, setDetailBooking] = useState({
    adults: [],
    childrens: [],
  });
  const [dates, setDates] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleChange = (value, name) =>
    setNewBooking({ ...newBooking, [name]: value });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsResponse, datesResponse, customerResponse] =
          await Promise.all([getBookings(), getDates(), getUsers()]);
        if (bookingsResponse.data.data) setBookings(bookingsResponse.data.data);
        if (datesResponse.data.data)
          setDates(
            datesResponse.data.data.map((date) => ({
              label:
                " Ngày đi: " +
                date.ngay +
                " - Mã tour: " +
                date.matour +
                " - Mã hướng dẫn viên: " +
                date.mahdv,
              value: date.id,
            }))
          );
        if (customerResponse.data.data) setCustomer(customerResponse.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (newBooking.makh != null) {
      newBooking.ten = customer[newBooking.makh - 1].ten;
      newBooking.sdt = customer[newBooking.makh - 1].sdt;
      newBooking.email = customer[newBooking.makh - 1].email;
      newBooking.diachi = customer[newBooking.makh - 1].diachi;
    }
  }, [newBooking.makh]);
  useEffect(() => {
    setNewBooking({
      ...newBooking,
      detailBooking: detailBooking,
    });
  }, [detailBooking]);
  const filteredItems = bookings.filter(
    (item) =>
      item.ten.toLowerCase().includes(search.toLowerCase()) ||
      item.sobooking.toLowerCase().includes(search.toLowerCase())
  );
  console.log(newBooking);
  const users = customer.map((user) => ({
    label:
      "Họ tên: " + user.ten + " - SDT: " + user.sdt + " - Email: " + user.email,
    value: user.id,
  }));
  const handleAdd = async () => {
    try {
      const response = await addBooking(newBooking);
      if (response.data.message === "Success") {
        window.location.href = "/admin/booking";
      }
    } catch (error) {
      toast.error(error.response.data.error[0]);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const response = await deleteBooking(id);
      if (response.data.message === "Success") {
        window.location.href = "/admin/booking";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        name: "STT",
        selector: (row) => row.id,
        sortable: true,
        width: "70px",
      },
      {
        name: "Mã Booking",
        selector: (row) => row.sobooking,
        sortable: true,
        width: "150px",
      },
      {
        name: "Ngày đặt",
        selector: (row) => row.ngay,
        sortable: true,
        width: "150px",
      },
      {
        name: "Họ tên",
        selector: (row) => row.ten,
        sortable: true,
        width: "100px",
      },
      {
        name: "Số điện thoại",
        selector: (row) => row.sdt,
        sortable: true,
        width: "100px",
      },
      {
        name: "Địa chỉ",
        selector: (row) => row.diachi,
        sortable: true,
        width: "100px",
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        width: "100px",
      },
      {
        name: "Tổng tiền",
        selector: (row) =>
          parseInt(row.tongtien).toLocaleString("en-US") + " VND",
        sortable: true,
        width: "150px",
      },
      {
        name: "Trạng thái",
        selector: (row) => row.trangthai,
        sortable: true,
        width: "120px",
      },
      {
        name: "Thao tác",
        selector: (row) => (
          <div className={cx("action")}>
            <IconButton
              width={"12px"}
              appearance="primary"
              color="red"
              icon={<MinusIcon />}
              onClick={(e) => handleDelete(row.id, e)}
            >
              Xóa
            </IconButton>
            <IconButton
              width={"12px"}
              appearance="primary"
              color="blue"
              icon={<EyeCloseIcon />}
              href={`/admin/detail_booking/${row.id}`}
            >
              Xem
            </IconButton>
          </div>
        ),
        sortable: true,
        width: "250px",
      },
    ],
    []
  );

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <SideNav />
        <div className={cx("right")}>
          <div className={cx("table")}>
            <DataTable
              title="Danh sách Booking"
              columns={columns}
              data={filteredItems}
              dense
              pagination
              highlightOnHover
              pointerOnHover
              subHeader
              subHeaderComponent={
                <div className={cx("header")}>
                  <IconButton
                    appearance="primary"
                    color="green"
                    icon={<PlusIcon />}
                    onClick={handleOpenAdd}
                  >
                    Thêm
                  </IconButton>
                  <InputGroup style={{ width: 400 }}>
                    <Input
                      placeholder={"Tìm kiếm theo tiêu đề"}
                      value={search}
                      onChange={setSearch}
                    />
                    <InputGroup.Addon color="green">
                      <SearchIcon />
                    </InputGroup.Addon>
                  </InputGroup>
                </div>
              }
              persistTableHead
            />
          </div>
        </div>
        <Modal open={openAdd} onClose={handleCloseAdd}>
          <Modal.Header>
            <Modal.Title>THÊM BOOKING</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Khách hàng</h5>
              <SelectPicker
                data={users}
                onChange={(value) => handleChange(value, "makh")}
                style={{ width: "100%" }}
                placeholder="Chọn khách hàng"
              />
              <h5>Họ tên</h5>
              <Input
                value={newBooking.ten || ""}
                placeholder={"Nhập họ tên tại đây"}
                onChange={(value) => handleChange(value, "ten")}
              />
              <h5>Địa chỉ</h5>
              <Input
                value={newBooking.diachi || ""}
                placeholder={"Nhập địa chỉ tại đây"}
                onChange={(value) => handleChange(value, "diachi")}
              />
              <h5>Số điện thoại</h5>
              <Input
                type="number"
                value={newBooking.sdt || ""}
                placeholder={"Nhập giá số điện thoại tại đây"}
                onChange={(value) => handleChange(value, "sdt")}
              />
              <h5>Email</h5>
              <Input
                placeholder={"Nhập giá email tại đây"}
                value={newBooking.email || ""}
                onChange={(value) => handleChange(value, "email")}
              />
              <h5>Trạng thái</h5>
              <Input
                placeholder={"Nhập trạng thái tại đây"}
                value={newBooking.trangthai || ""}
                onChange={(value) => handleChange(value, "trangthai")}
              />
              <h5>Ngày đi</h5>
              <SelectPicker
                data={dates}
                onChange={(value) => handleChange(value, "mand")}
                style={{ width: "100%" }}
                placeholder="Chọn ngày đi"
              />
              <h5>Số người lớn</h5>
              <Input
                type="number"
                placeholder={"Nhập số người lớn tại đây"}
                value={newBooking.nguoilon || ""}
                onChange={(value) => handleChange(value, "nguoilon")}
              />
              <h5>Số trẻ em</h5>
              <Input
                type="number"
                placeholder={"Nhập số trẻ em tại đây"}
                value={newBooking.treem || ""}
                onChange={(value) => handleChange(value, "treem")}
              />
              {Array.from({ length: newBooking.nguoilon }).map((_, i) => {
                return (
                  <div key={`adult-${i}`}>
                    <h5>Người lớn {`${i + 1}`}</h5>
                    <h5>Họ và tên</h5>
                    <Input
                      style={{ width: 350 }}
                      block
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
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleAdd} appearance="primary">
              Thêm
            </Button>
            <Button onClick={handleCloseAdd} appearance="subtle">
              Hủy
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AdminBooking;
