"use client";
import React, { useState, FormEvent } from "react";
import styles from "./page.module.css";
import Image from "next/image";
// import Carousel from "@/app/components/carousel";
// import Verification from "../verification/page";
// import { useAuthContext } from "@/context/auth";
import Link from "next/link";
import { SignUpFormSchema } from "@/types/signup";
import { ZodError } from "zod";
import Visibility from "/public/icons/visibility.svg";
import VisibilityOff from "/public/icons/visibilityOff.svg";
import { myFetch } from "@/utils/myFetch";
import { baseUrl } from "@/constants";
// import logo from "/public/Logo_Light mode.png";

const SignUp = () => {
  const [showVerification, setShowVerification] = useState(false);
  //   const { signup } = useAuthContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: any = {
      name,
      email,
      password,
      confirmPassword,
    };
    console.log(formData);
    try {
      SignUpFormSchema.parse(formData);
      setErrors({});
      if (password.includes(" ")) {
        setErrors({ password: "Password must not contains spaces" });
        return;
      }
      if (password.trim().length < 8) {
        setErrors({ password: "Passoword should be atleast 8 characters" });
        return;
      }
      if (password !== confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match. Try again" });
        return;
      }
      if (name.split(" ")[1] === undefined || name.split(" ")[1].length === 0) {
        setErrors({ name: "Please Enter Full Name" });
        return;
      }
      if (mobileNo.length > 10 || mobileNo.startsWith("+")) {
        setErrors({ mobileNo: "Enter 10 digit mobile number only" });
        return;
      }
      setIsLoading(true);
      const response = await myFetch(`${baseUrl}/auth/signup`);
      setIsLoading(false);
      console.log("Response", response);
      // if (!response[0]?.error) {
      //   generateOtp();
      //   setShowVerification(true);
      // } else {
      //   setErrors({ email: response[0].error.message });
      // }
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

  const generateOtp = async () => {
    const url = `${baseUrl}/auth/customer/verify/generate`;
    const { data, error } = await myFetch(url, {
      method: "POST",
    });
    if (data) console.log(data);
    if (error) {
      console.log(error);
      return;
    }
  };
  console.log(errors);
  const obj = {
    email: email,
  };
  return (
    <div className={styles.container}>
      <div className={styles.sub_container}>
        <div className={styles.sub_containerLeft}>{/* <Carousel /> */}</div>
        <form onSubmit={handleSignUp} className={styles.formContainer}>
          <div className={styles.form_container}>
            <div className={styles.form_heading}>
              {/* <Image src={logo} alt="logo" /> */}
            </div>
            <div className={styles.form_heading}>Create Your Account</div>

            <div className={styles.input_container}>
              <div className={styles.input_title}>Full Name</div>
              <input
                className={`${styles.input} ${
                  errors.name && styles.error_boundary
                }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <div className={styles.error}>{errors.name}</div>}
            </div>

            <div className={styles.input_container}>
              <div className={styles.input_title}>Email</div>
              <input
                className={`${styles.input} ${
                  errors.email && styles.error_boundary
                }`}
                value={email}
                type="email"
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
                type={passwordVisibility ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Image
                src={passwordVisibility ? VisibilityOff : Visibility}
                alt="visibility"
                className={styles.visibility_Icon}
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              />
              {errors.password && (
                <div className={styles.error}>{errors.password}</div>
              )}
            </div>

            <div className={styles.input_container}>
              <div className={styles.input_title}>Confirm Password</div>
              <input
                className={`${styles.input} ${
                  errors.confirmPassword && styles.error_boundary
                }`}
                value={confirmPassword}
                type={confirmPasswordVisibility ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {errors.confirmPassword && (
                <div className={styles.error}>{errors.confirmPassword}</div>
              )}
            </div>

            <div className={styles.actions_container}>
              <button
                className={`${styles.button} ${isLoading && styles.disable}`}
                type="submit"
              >
                {`${isLoading ? "Loading..." : "Sign Up"} `}
              </button>
              <div className={styles.new_account}>
                Already have an account?
                <Link href="/signin" className={styles.createNew_link}>
                  {" "}
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* {showVerification && <Verification params={obj} />} */}
    </div>
  );
};

export default SignUp;
