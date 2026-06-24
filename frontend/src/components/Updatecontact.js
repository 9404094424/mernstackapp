import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router';

export default function Updatecontact() {

    const params = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState({
        name: '',
        email: '',
        mobile: ''
    });

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_PATH + "/api/contacts/" + params.contact_id)
            .then((res) => {
                console.log(res.data);
                setItem({
                    name: res.data.name || '',
                    email: res.data.email || '',
                    mobile: res.data.mobile || ''
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [params.contact_id]);

    const formik = useFormik({
        initialValues: item,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const response = await axios.put(
                    process.env.REACT_APP_API_PATH + "/api/contacts/" + params.contact_id,
                    values
                );

                console.log(response.data);
                navigate("/showcontact");

            } catch (error) {
                console.error("Error updating data:", error);
            }
        }
    });

    return (
        <div className="container my-4 p-4 bg-white rounded shadow-sm" style={{ maxWidth: '500px' }}>
            <h3 className="mb-4 text-dark fw-semibold text-center">Update Contact</h3>

            <form onSubmit={formik.handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-medium text-secondary">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder='Enter Name'
                        className="form-control"
                        placeholder="Enter contact name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-medium text-secondary">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder='Enter Email'
                        className="form-control"
                        placeholder="name@example.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="mobile" className="form-label fw-medium text-secondary">Mobile Number</label>
                    <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        placeholder='Enter Mobile No'
                        className="form-control"
                        placeholder="Enter mobile number"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold shadow-sm">
                    Update Contact
                </button>

            </form>
        </div>
    );
}