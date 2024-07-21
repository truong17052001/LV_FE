import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite
import { Modal, Button, Input, InputGroup, IconButton, TagPicker, SelectPicker } from "rsuite";
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
import { getTours, getBookings, addBooking, deleteBooking } from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [newBooking, setNewBooking] = useState({
  });
  const [tours, setTours] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleChange = (value, name) => setNewBooking({ ...newBooking, [name]: value });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsResponse, toursResponse] = await Promise.all([
          getBookings(),
          getTours(),
        
        ]);
        if (bookingsResponse.data.data) setBookings(bookingsResponse.data.data);
        if (toursResponse.data.data) setTours(toursResponse.data.data.map(tours => ({ label: tours.matour, value: tours.id })));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filteredItems = bookings.filter(
    (item) =>
      item.ten.toLowerCase().includes(search.toLowerCase()) ||
      item.sobooking.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    try {
      const response = await addBooking(newBooking);
      if (response.data.message === "Success") {
        window.location.href = "/admin/booking";
      }
    } catch (error) {
      console.log(error);
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

  const columns = useMemo(() => [
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
      selector: (row) => parseInt(row.tongtien).toLocaleString("en-US") + " VND",
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
  ], []);

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
              <h5>Ngày đặt</h5>
              <Input
                placeholder={"Nhập mã tại đây"}
                value={newBooking.sobooking}
                onChange={(value) => handleChange(value, "code")}
              />
              <h5>Họ tên</h5>
              <Input
                placeholder={"Nhập họ tên tại đây"}
                value={newBooking.ten}
                onChange={(value) => handleChange(value, "title")}
              />
              <h5>Địa chỉ</h5>
              <Input
                placeholder={"Nhập địa chỉ tại đây"}
                value={newBooking.diachi}
                onChange={(value) => handleChange(value, "meet_place")}
              />
              <h5>Số điện thoại</h5>
              <Input
                type="number"
                placeholder={"Nhập giá số điện thoại tại đây"}
                value={newBooking.sdt}
                onChange={(value) => handleChange(value, "price")}
              />
              <h5>Email</h5>
              <Input
                placeholder={"Nhập giá email tại đây"}
                value={newBooking.sdt}
                onChange={(value) => handleChange(value, "price")}
              />
              <h5>Tour</h5>
              <SelectPicker
                data={tours}
                value={newBooking.tours}
                onChange={(value) => handleChange(value, "tours")}
                style={{ width: '100%' }}
                placeholder="Chọn tour"
              />
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
