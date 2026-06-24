import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Contactadd = () => {
    let[info,setInfo]=useState("");
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters long')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email address format')
            .required('Email is required'),
        mobile: Yup.string()
            .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
            .required('Mobile number is required'),
    });

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: { name: '', email: '', mobile: '' },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            axios.post(process.env.REACT_APP_API_PATH+ "/api/contacts", values)
                .then((res) => {
                    setInfo("user added");
                    navigate("/showcontact");
                })
                .catch((err) => {
                    console.log(err.response.data)
                    setInfo(err.response.data.message);
                });
                // navigate("/showcontact");
            resetForm();
        },
    });



    return (
        <div className="form-container">
            <h3 className='text-center'>Add New Contact</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="input-group-custom">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder='Enter Name'
                        className={formik.touched.name && formik.errors.name ? 'error-field' : ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <span className="error-text">{formik.errors.name}</span>
                    )}
                </div>

                <div className="input-group-custom">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder='Enter Email'
                        className={formik.touched.email && formik.errors.email ? 'error-field' : ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <span className="error-text">{formik.errors.email}</span>
                    )}
                </div>

                <div className="input-group-custom">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        placeholder='Enter Mobile No'
                        className={formik.touched.mobile && formik.errors.mobile ? 'error-field' : ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mobile}
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                        <span className="error-text">{formik.errors.mobile}</span>
                    )}
                </div>

                <button type="submit">Submit Contact</button>
                    {
                        (info!="")?( <p className='alert alert-danger mt-2'>{info}</p> ) : ""
                    }
            </form>
        </div>
    );
};

export default Contactadd;