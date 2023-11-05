import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useFormik } from "formik";

import Layout from "@/layout/auth-layout";
import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { validateRegister } from "@/lib/validate";
import { useRouter } from "next/router";

const Register = () => {
  const [show, setShow] = useState({ pass: false, cpass: false });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: validateRegister,
    onSubmit: async (values) => {
      console.log(values);
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      console.log(data);
      if (data) router.push("http://localhost:3000/login");
    },
  });

  return (
    <Layout>
      <Head>
        <title>TalkGenius: Register</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
          <p className="w-fit mx-auto text-gray-500 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          </p>
        </div>

        <form className="flex flex-col gap-8" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <div className={styles.input_group}>
              <input
                className={styles.input_text}
                type="text"
                name="username"
                placeholder="Username"
                {...formik.getFieldProps("username")}
              />
              <span className="icon flex items-center px-4">
                <HiOutlineUser size={25} />
              </span>
            </div>
            {formik.errors.username && formik.touched.username ? (
              <span className="text-rose-500 absolute inset-x-0 -bottom-6">
                {formik.errors.username}
              </span>
            ) : null}
          </div>
          <div className="relative">
            <div className={styles.input_group}>
              <input
                className={styles.input_text}
                type="email"
                name="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
              </span>
            </div>
            {formik.errors.email && formik.touched.email ? (
              <span className="text-rose-500  absolute inset-x-0 -bottom-6">
                {formik.errors.email}
              </span>
            ) : null}
          </div>
          <div className="relative">
            <div className={styles.input_group}>
              <input
                className={styles.input_text}
                type={show.pass ? "text" : "password"}
                name="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow({ ...show, pass: !show.pass })}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
            {formik.errors.password && formik.touched.password ? (
              <span className="text-rose-500  absolute inset-x-0 -bottom-6">
                {formik.errors.password}
              </span>
            ) : null}
          </div>
          <div className="relative">
            <div className={styles.input_group}>
              <input
                className={styles.input_text}
                type={show.cpass ? "text" : "password"}
                name="cpassword"
                placeholder="Confirm password"
                {...formik.getFieldProps("cpassword")}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow({ ...show, cpass: !show.cpass })}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
            {formik.errors.cpassword && formik.touched.cpassword ? (
              <span className="text-rose-500  absolute inset-x-0 -bottom-6">
                {formik.errors.cpassword}
              </span>
            ) : null}
          </div>

          <div className="input-button">
            <button className={styles.button} type="submit">
              Register
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <Link className="text-blue-700" href={"/login"}>
            Sign In
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Register;
