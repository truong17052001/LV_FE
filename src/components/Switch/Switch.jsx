import classNames from "classnames/bind";
import styles from "./Switch.module.scss";

const cx = classNames.bind(styles);

function Switch({children}) {
  return (
    <div className={cx("wrapper")}>
      <label className={cx("switch")}>
        <input type="checkbox" />
        <span className={cx("slider")}></span>
      </label>
      <p>{children}</p>
    </div>
  );
}

export default Switch;
