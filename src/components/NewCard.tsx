import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { normalizeCard } from "../utils/cards/NormalizeCard";
import { UnnormalizedCard } from "../interfaces/cards/UnnormalizedCard";
import { postNewCard } from "../services/cardsService";
import { errorMessage, sucessMassage } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";

const NewCard: FunctionComponent<object> = () => {
  const navigate = useNavigate();
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      url: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
    validationSchema: yup.object({
      title: yup.string().min(2).max(256).required(),
      subtitle: yup.string().min(2).max(256).required(),
      description: yup.string().min(2).max(1024).required(),
      phone: yup.string().min(9).max(11).required(),
      email: yup.string().email().min(5).required(),
      url: yup.string().min(14),
      alt: yup.string().min(2).max(256),
      state: yup.string(),
      country: yup.string().required(),
      city: yup.string().required(),
      street: yup.string().required(),
      houseNumber: yup.number().min(1).required(),
      zip: yup.number().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      const normalizedCard = normalizeCard(values as UnnormalizedCard);
      postNewCard(normalizedCard)
        .then(() => {
          sucessMassage(`Your card post successfuly!`);
          navigate("/my-cards");
        })
        .catch((err) => {
          errorMessage(err.response.data);
        });

      resetForm();
    },
  });
  return (
    <>
      <div className="container-form w-100 d-flex flex-column align-items-center mb-5 py-3">
        <h1 className="display-1 text-center mb-4">Create new card</h1>
        <form className="w-50 mb-5 form" onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="title"
              name="title"
              value={formik.values.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="title">Title</label>
            {formik.touched.title && formik.errors.title && (
              <p className="text-danger">{formik.errors.title}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="subtitle"
              placeholder="subtitle"
              name="subtitle"
              value={formik.values.subtitle}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="subTitle">Subtitle</label>
            {formik.touched.subTitle && formik.errors.subTitle && (
              <p className="text-danger">{formik.errors.subTitle}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="description"
              name="description"
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="description">Description</label>
            {formik.touched.description && formik.errors.description && (
              <p className="text-danger">{formik.errors.description}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="phone"
              name="phone"
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="phone">Phone</label>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="email"
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">Email</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="url"
              className="form-control"
              id="web"
              placeholder="web"
              name="web"
              value={formik.values.web}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="web">Web</label>
            {formik.touched.web && formik.errors.web && (
              <p className="text-danger">{formik.errors.web}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="url"
              className="form-control"
              id="url"
              placeholder="url"
              name="url"
              value={formik.values.url}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="url">URL</label>
            {formik.touched.url && formik.errors.url && (
              <p className="text-danger">{formik.errors.url}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="alt"
              placeholder="alt"
              name="alt"
              value={formik.values.alt}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="alt">Alt</label>
            {formik.touched.alt && formik.errors.alt && (
              <p className="text-danger">{formik.errors.alt}</p>
            )}
          </div>

          <div className="row g-3">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  name="state"
                />
                <label htmlFor="state">State</label>
                {formik.touched.state && formik.errors.state && (
                  <p className="text-danger">{formik.errors.state}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder=""
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  required
                />
                <label htmlFor="country">Country</label>
                {formik.touched.country && formik.errors.country && (
                  <p className="text-danger">{formik.errors.country}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder=""
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  required
                />
                <label htmlFor="city">City</label>
                {formik.touched.city && formik.errors.city && (
                  <p className="text-danger">{formik.errors.city}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  placeholder=""
                  name="street"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                  required
                />
                <label htmlFor="street">Street</label>
                {formik.touched.street && formik.errors.street && (
                  <p className="text-danger">{formik.errors.street}</p>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="houseNumber"
                  placeholder=""
                  name="houseNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.houseNumber}
                  required
                />
                <label htmlFor="houseNumber">House Number</label>
                {formik.touched.houseNumber && formik.errors.houseNumber && (
                  <p className="text-danger">{formik.errors.houseNumber}</p>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  name="zip"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zip}
                  required
                />
                <label htmlFor="zip">Zip Code</label>
                {formik.touched.zip && formik.errors.zip && (
                  <p className="text-danger">{formik.errors.zip}</p>
                )}
              </div>
            </div>
          </div>

          <button
            disabled={!formik.dirty || !formik.isValid}
            type="submit"
            className="btn btn-dark">
            Create Business
          </button>
        </form>
      </div>
    </>
  );
};

export default NewCard;
