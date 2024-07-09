import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./Tour.module.scss";
//components
import SideNav from "../../../components/SideNav/SideNav";
//rsuite
import { Modal, Button, Input, InputGroup, IconButton, TagPicker } from "rsuite";
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
import { getHotels, getPlaces, getVehicles, getTours, addTour, deleteTour } from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminTour() {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [newTour, setNewTour] = useState({
    code: "",
    title: "",
    meet_place: "",
    price: "",
    img_tour: "",
    note: ""
  });
  const [hotels, setHotels] = useState([]);
  const [places, setPlaces] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleChange = (value, name) => setNewTour({ ...newTour, [name]: value });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toursResponse, hotelsResponse, placesResponse, vehiclesResponse] = await Promise.all([
          getTours(),
          getHotels(),
          getPlaces(),
          getVehicles()
        ]);
        if (toursResponse.data.data) setTours(toursResponse.data.data);
        if (hotelsResponse.data.data) setHotels(hotelsResponse.data.data.map(hotel => ({ label: hotel.name, value: hotel.id })));
        if (placesResponse.data.data) setPlaces(placesResponse.data.data.map(place => ({ label: place.name_place, value: place.id })));
        if (vehiclesResponse.data.data) setVehicles(vehiclesResponse.data.data.map(vehicle => ({ label: vehicle.name, value: vehicle.id })));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filteredItems = tours.filter(
    (item) =>
      item.title_tour.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    try {
      const response = await addTour(newTour);
      if (response.data.message === "Success") {
        window.location.href = "/admin/tour";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const response = await deleteTour(id);
      if (response.data.message === "Success") {
        window.location.href = "/admin/tour";
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
      name: "Ảnh",
      selector: (row) => <img src={row.img_tour} alt="tour" />,
      sortable: true,
      width: "120px",
    },
    {
      name: "Mã tour",
      selector: (row) => row.code,
      sortable: true,
      width: "200px",
    },
    {
      name: "Tiêu đề",
      selector: (row) => row.title_tour,
      sortable: true,
      width: "300px",
    },
    {
      name: "Giá tour ( Đồng )",
      selector: (row) => parseInt(row.price).toLocaleString("en-US") + " VND",
      sortable: true,
      width: "150px",
    },
    {
      name: "Nơi tập trung",
      selector: (row) => row.meet_place,
      sortable: true,
      width: "150px",
    },
    {
      name: "Trạng thái",
      selector: (row) => row.note,
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
            href={`/admin/detail_tour/${row.id}`}
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
              title="Danh sách tour"
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
            <Modal.Title>THÊM TOUR</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx("form")}>
              <h5>Mã tour</h5>
              <Input
                placeholder={"Nhập mã tại đây"}
                value={newTour.code}
                onChange={(value) => handleChange(value, "code")}
              />
              <h5>Tiêu đề tour</h5>
              <Input
                placeholder={"Nhập tiêu đề tại đây"}
                value={newTour.title}
                onChange={(value) => handleChange(value, "title")}
              />
              <h5>Nơi tập trung</h5>
              <Input
                placeholder={"Nhập nơi tập trung tại đây"}
                value={newTour.meet_place}
                onChange={(value) => handleChange(value, "meet_place")}
              />
              <h5>Giá tour ( VND )</h5>
              <Input
                type="number"
                placeholder={"Nhập giá tour tại đây"}
                value={newTour.price}
                onChange={(value) => handleChange(value, "price")}
              />
              <h5>Ảnh</h5>
              <Input
                placeholder={"Nhập link ảnh tại đây"}
                value={newTour.img_tour}
                onChange={(value) => handleChange(value, "img_tour")}
              />
              <h5>Chú thích</h5>
              <Input
                placeholder={"Nhập chú thích tại đây"}
                value={newTour.note}
                onChange={(value) => handleChange(value, "note")}
              />
              <h5>Khách sạn</h5>
              <TagPicker
                data={hotels}
                value={newTour.hotels}
                onChange={(value) => handleChange(value, "hotels")}
                style={{ width: '100%' }}
                placeholder="Chọn khách sạn"
              />
              <h5>Địa danh</h5>
              <TagPicker
                data={places}
                value={newTour.places}
                onChange={(value) => handleChange(value, "places")}
                style={{ width: '100%' }}
                placeholder="Chọn địa danh"
              />
              <h5>Phương tiện</h5>
              <TagPicker
                data={vehicles}
                value={newTour.vehicles}
                onChange={(value) => handleChange(value, "vehicles")}
                style={{ width: '100%' }}
                placeholder="Chọn phương tiện"
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

export default AdminTour;
