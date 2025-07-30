import { FormikProps, useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { loginUser } from "../services/userService";
import { errorMessage, sucessMassage } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";
import { useToken } from "../context/TokenContext";
import { LoginValues } from "../interfaces/auth/auth";

const Login: FunctionComponent<object> = () => {
  const navigate = useNavigate();
  const { updateToken } = useToken();

  const formik: FormikProps<LoginValues> = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().min(5).required(),
      password: yup
        .string()
        .min(7)
        .max(20)
        .required()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\-"])[A-Za-z\d!@#$%^&*\-"]{8,}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-"), and be at least 8 characters long'
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      loginUser(values)
        .then((res) => {
          const token: string = res.data;
          updateToken(token);
          sucessMassage(`${values.email} Logged in successfully`);
          navigate("/");
        })
        .catch((err) => {
          errorMessage(err.response.data);
        });
      resetForm();
    },
  });

  return (
    <div className="w-50 mx-auto py-3 container-form">
      <h1 className="display-1 text-center mb-4">Login</h1>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="jhon@doe.com"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
          />
          <label htmlFor="email">Email</label>
          {formik.touched.email && formik.errors.email && (
            <p className="text-danger">{formik.errors.email}</p>
          )}
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder=""
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            required
          />
          <label htmlFor="password">Password</label>
          {formik.touched.password && formik.errors.password && (
            <p className="text-danger">{formik.errors.password}</p>
          )}
        </div>
        <button
          disabled={!formik.dirty || !formik.isValid}
          type="submit"
          className="btn btn-primary mt-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
