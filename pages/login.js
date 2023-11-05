import Head from "next/head";
import Layout from "@/layout/auth-layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import validateLogin from "@/lib/validate";
import { useRouter } from "next/router";

const Login = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: async (values) => {
      console.log(values);
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });
      console.log(response);
      if (response.ok) {
        router.push(response.url);
      }
    },
  });

  return (
    <Layout>
      <Head>
        <title>TalkGenius: Login</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <Link className="text-gray-800 text-4xl font-bold py-4" href="/">
            TalkGenius
          </Link>
          {/* <p className="w-fit mx-auto text-gray-500 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          </p> */}
        </div>

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-8">
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
                <span className="text-rose-500 absolute inset-x-0 -bottom-6">
                  {formik.errors.email}
                </span>
              ) : null}
            </div>
            <div className="relative">
              <div className={styles.input_group}>
                <input
                  className={styles.input_text}
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
                <span
                  className="icon flex items-center px-4"
                  onClick={() => setShow(!show)}
                >
                  <HiFingerPrint size={25} />
                </span>
              </div>
              {formik.errors.password && formik.touched.password ? (
                <span className="text-rose-500 absolute inset-x-0 -bottom-6">
                  {formik.errors.password}
                </span>
              ) : null}
            </div>
            <div className="input-button mt-2">
              <button className={styles.button} type="submit">
                Login
              </button>
            </div>
          </div>

          <div className="input-button">
            <button
              className={styles.button_custom}
              type="button"
              onClick={async () =>
                signIn("google", { callbackUrl: "http://localhost:3000" })
              }
            >
              Sign In with Google
            </button>
          </div>
          <div className="input-button">
            <button
              className={styles.button_custom}
              type="button"
              onClick={async () =>
                signIn("github", { callbackUrl: "http://localhost:3000" })
              }
            >
              Sign In with GitHub
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400">
          don&apos;t have an account yet?{" "}
          <Link className="text-blue-700" href={"/register"}>
            Sign Up
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Login;
