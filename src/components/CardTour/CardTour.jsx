import { useState, useEffect } from "react";

import classNames from "classnames/bind";
import styles from "./CardTour.module.scss";
//api
import { getTourDetails } from "../../core/services/apiServices";

const cx = classNames.bind(styles);
//icon
import { LuTicket } from "react-icons/lu";
import { FaCartShopping } from "react-icons/fa6";
function CardTour({
  id,
  code,
  title_tour,
  meet_place,
  price,
  img_tour,
  state,
  date
}) {
  // console.log(date);
  return (
    <div className={cx("item")}>
      <div className={cx("img")}>
        <img src={img_tour} placeholder="img"></img>
        {/* <div className={cx("summary")}>
          <div className={cx("rate")}>
            <span>9.4</span>
          </div>
          <div className={cx("review")}>
            <h3>Tuyệt vời</h3>
            <p>358 quan tâm</p>
          </div>
        </div> */}
      </div>
      <div className={cx("body")}>
        {date && date[0]  ? <p className={cx("date")}>{date[0].songaydi} ngày</p> : ""}
        <p className={cx("title")}>
          <a href={`/detail/${id}`}>{title_tour}</a>
        </p>
        <div className={cx("code")}>
          <div>Mã tour:</div>
          <div>
            <LuTicket></LuTicket>
            <span>{code}</span>
          </div>
        </div>
        <p className={cx("departure")}>
          Nơi khởi hành: <span>{meet_place}</span>
        </p>
        {date && date[0] != null ? (
          <p className={cx("departure")}>
            Ngày khởi hành: <span>{date[0].ngay}</span>
          </p>
        ) : (
          ""
        )}
        <div className={cx("price")}>
          Giá:
          <del>
            {parseInt(price * 1 + (price * 6) / 100).toLocaleString("en-US")} ₫
          </del>
          <a href={`/detail/${id}`}>
            {parseInt(price).toLocaleString("en-US")} VND
            <span>
              <FaCartShopping></FaCartShopping>Đặt ngay
            </span>
          </a>
        </div>
      </div>
      <div className={cx("footer")}>
        {state == "Ưu đãi" ? <div>Giảm 6%</div> : <div>Giá tiêu chuẩn</div>}

        {date && date[0] != null ? (
          <p>
            Số chỗ còn <span>{date[0].chongoi}</span>
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CardTour;
