import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import classNames from "classnames/bind";
import styles from "./Tour.module.scss";
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
  TagInput,
} from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import PlusIcon from "@rsuite/icons/Plus";
import MinusIcon from "@rsuite/icons/Minus";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import "rsuite/Modal/styles/index.css";
import "rsuite/Input/styles/index.css";
import "rsuite/InputGroup/styles/index.css";
import "rsuite/IconButton/styles/index.css";
import "rsuite/TagPicker/styles/index.css";
import "rsuite/TagInput/styles/index.css";

// Services
import {
  getHotels,
  getPlaces,
  getVehicles,
  getTours,
  addTour,
  deleteTour,
} from "../../../core/services/apiServices";

const cx = classNames.bind(styles);

function AdminTour() {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [newTour, setNewTour] = useState({});
  const [hotels, setHotels] = useState([]);
  const [places, setPlaces] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleChange = (value, name) =>
    setNewTour({ ...newTour, [name]: value });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          toursResponse,
          hotelsResponse,
          placesResponse,
          vehiclesResponse,
        ] = await Promise.all([
          getTours(),
          getHotels(),
          getPlaces(),
          getVehicles(),
        ]);
        if (toursResponse.data.data) setTours(toursResponse.data.data);
        if (hotelsResponse.data.data)
          setHotels(
            hotelsResponse.data.data.map((hotel) => ({
              label: hotel.ten,
              value: hotel.id,
            }))
          );
        if (placesResponse.data.data)
          setPlaces(
            placesResponse.data.data.map((place) => ({
              label: place.ten,
              value: place.id,
            }))
          );
        if (vehiclesResponse.data.data)
          setVehicles(
            vehiclesResponse.data.data.map((vehicle) => ({
              label: vehicle.ten,
              value: vehicle.id,
            }))
          );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filteredItems = tours.filter(
    (item) =>
      item.tieude.toLowerCase().includes(search.toLowerCase()) ||
      item.matour.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    try {
      const response = await addTour(newTour);
      if (response.data.message === "Success") {
        toast.success("Thêm tour thành công");
        window.location.href = "/admin/tour";
      }
    } catch (error) {
      toast.error(error.response.data.error[0]);
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
      toast.error(error.response.data.error[0]);
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
        name: "Ảnh",
        selector: (row) => <img src={row.anh} alt="tour" />,
        sortable: true,
        width: "120px",
      },
      {
        name: "Mã tour",
        selector: (row) => row.matour,
        sortable: true,
        width: "200px",
      },
      {
        name: "Tiêu đề",
        selector: (row) => row.tieude,
        sortable: true,
        width: "300px",
      },
      {
        name: "Giá người lớn",
        selector: (row) => parseInt(row.gia_a).toLocaleString("en-US") + " VND",
        sortable: true,
        width: "150px",
      },
      {
        name: "Giá trẻ em",
        selector: (row) => parseInt(row.gia_c).toLocaleString("en-US") + " VND",
        sortable: true,
        width: "150px",
      },
      {
        name: "Nơi tập trung",
        selector: (row) => row.noikh,
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
              href={`/admin/detail_tour/${row.id}`}
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
                value={newTour.matour}
                onChange={(value) => handleChange(value, "matour")}
              />
              <h5>Tiêu đề tour</h5>
              <Input
                placeholder={"Nhập tiêu đề tại đây"}
                value={newTour.tieude}
                onChange={(value) => handleChange(value, "tieude")}
              />
              <h5>Nơi tập trung</h5>
              <Input
                placeholder={"Nhập nơi tập trung tại đây"}
                value={newTour.noikh}
                onChange={(value) => handleChange(value, "noikh")}
              />
              <h5>Giá người lớn ( VND )</h5>
              <Input
                type="number"
                placeholder={"Nhập giá tour người lớn tại đây"}
                value={newTour.gia_a}
                onChange={(value) => handleChange(value, "gia_a")}
              />
              <h5>Giá trẻ em( VND )</h5>
              <Input
                type="number"
                placeholder={"Nhập giá tour trẻ em tại đây"}
                value={newTour.gia_c}
                onChange={(value) => handleChange(value, "gia_c")}
              />
              <h5>Ảnh đại diện</h5>
              <Input
                placeholder={"Nhập link ảnh tại đây"}
                value={newTour.anh}
                onChange={(value) => handleChange(value, "anh")}
              />
              <h5>Ảnh phụ</h5>
              <TagInput
                placeholder={"Nhập link ảnh tại đây"}
                value={newTour.images}
                onChange={(value) => handleChange(value, "images")}
                style={{ width: "100%" }}
              />
              <h5>Chú thích</h5>
              <Input
                placeholder={"Nhập chú thích tại đây"}
                value={newTour.trangthai}
                onChange={(value) => handleChange(value, "trangthai")}
              />
              <h5>Khách sạn</h5>
              <TagPicker
                data={hotels}
                value={newTour.hotels}
                onChange={(value) => handleChange(value, "hotels")}
                style={{ width: "100%" }}
                placeholder="Chọn khách sạn"
              />
              <h5>Địa danh</h5>
              <TagPicker
                data={places}
                value={newTour.places}
                onChange={(value) => handleChange(value, "places")}
                style={{ width: "100%" }}
                placeholder="Chọn địa danh"
              />
              <h5>Phương tiện</h5>
              <TagPicker
                data={vehicles}
                value={newTour.vehicles}
                onChange={(value) => handleChange(value, "vehicles")}
                style={{ width: "100%" }}
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
