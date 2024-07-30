"use client";
import React, { useState, FormEvent, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
// import Carousel from "@/app/components/carousel";
// import { useAuthContext } from "@/context";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SignInFormSchema } from "@/types/signin";
import { ZodError } from "zod";
import Visibility from "/public/icons/visibility.svg";
import VisibilityOff from "/public/icons/visibilityOff.svg";
import { showToast } from "@/utils/showToast";
import { myFetch } from "@/utils/myFetch";
import { baseUrl } from "@/constants";
import { useAuth } from "@/context/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rememberMe, setRememberMe] = useState(false);
  const { signin } = useAuth();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  //   const { signin } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const signinHandler = async (event: any) => {
    event?.preventDefault();
    try {
      SignInFormSchema.parse({ email, password });
      setErrors({});
      setIsLoading(true);
      const { data, error } = await signin(email, password);

      if (data) {
        console.log(data);
      }

      if (error) {
        console.log(error);
      }
      setIsLoading(false);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            validationErrors[err.path.join(".")] = err.message;
          }
        });
        setErrors(validationErrors);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  const obj = {
    email: email,
  };

  return (
    <div className={styles.container}>
      <div className={styles.sub_container}>
        {/* <Image src={LoginVisuals} alt="loginvisuals" className={styles.image} /> */}
        <div className={styles.sub_containerLeft}>{/* <Carousel /> */}</div>
        <form className={styles.loginForm}>
          <div className={styles.form_container}>
            <div className={styles.form_heading}>
              {/* <Image src={logo} alt="logo" /> */}
            </div>

            <div className={styles.input_container}>
              <div className={styles.input_title}>Email Address</div>
              <input
                className={`${styles.input} ${
                  errors.email && styles.error_boundary
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className={styles.error}>{errors.email}</div>
              )}
            </div>

            <div className={styles.input_container}>
              <div className={styles.input_title}>Password</div>
              <input
                className={`${styles.input} ${
                  errors.password && styles.error_boundary
                }`}
                value={password}
                type={visible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Image
                src={visible ? VisibilityOff : Visibility}
                alt="visibility"
                className={styles.visibility_Icon}
                onClick={() => setVisible(!visible)}
              />
              {errors.password && (
                <div className={styles.error}>{errors.password}</div>
              )}
            </div>

            <div className={styles.checkbox_container}>
              <input
                type="checkbox"
                id="remember"
                className={styles.checkbox_input}
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember" className={styles.checkbox_title}>
                Remember me
              </label>
            </div>

            <div className={styles.actions_container}>
              <button
                className={styles.button}
                type="submit"
                onClick={signinHandler}
              >
                {isLoading ? "Logging..." : "Login"}
              </button>

              <div className={styles.new_account}>
                Do not have an account?
                <Link href={"/signup"} className={styles.createNew_link}>
                  Create New
                </Link>
              </div>
            </div>

            <Link
              href="/forgot-password"
              className={styles.forgot_password_link}
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
