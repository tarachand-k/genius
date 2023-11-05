// import Image from "next/image";
import styles from "@/styles/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className="m-auto bg-slate-50 rounded-md w-fit h-fit">
        <div className="right flex flex-col justify-center items-center">
          <div className="text-center h-fit py-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
