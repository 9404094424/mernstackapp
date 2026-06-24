import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

const Pagination = () => {



    const [record, setrecord] = useState([]);
    const [count, setCount] = useState(0);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    // Fetch contacts
    useEffect(() => {

        axios
            .get(process.env.REACT_APP_API_PATH+`/api/contacts/pagination/${page}`)
            .then((res) => {

                console.log(res.data);

                setrecord(res.data.record);
                setCount(res.data.count)
                setTotalPages(res.data.pages);
                // setTotalRecords(res.data.totalRecords);

            })
            .catch((err) => {
                console.log(err);
            });

    }, [page]);

    // Delete contact
    function onDelete(ev, id) {

        axios.delete(process.env.REACT_APP_API_PATH+"/api/contacts/" + id)
            .then((res) => {

                console.log(res.data);

                setrecord(prev =>
                    prev.filter(contact => contact._id !== id)
                );

                setTotalRecords(prev => prev - 1);

            })
            .catch(err => console.log(err));
    }

    // Search contact
    function searchValue(ev) {

        ev.preventDefault();

        let value = txtValue.current.value;
        let typedata = type.current.value;

        axios.post(
            process.env.REACT_APP_API_PATH+"/api/contacts/search",
            {
                type: typedata,
                value: value
            }
        )
            .then((res) => {

                console.log(res.data);

                // Assuming search returns an array
                setrecord(res.data);

                // Search results treated as one page
                setTotalPages(1);
                setPage(1);
                setTotalRecords(res.data.length);

            })
            .catch((err) => {
                console.log(err.response?.data);
            });
    }

    return (
        <div className="table-responsive-container">

            <h3 className='text-center'>
               Pagination List
            </h3>



            <hr />

            <table className="custom-table">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        record && record.length > 0 ?

                            record.map((contact) => (

                                <tr key={contact._id}>

                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.mobile}</td>

                                    <td className="text-center actions-cell">

                                        <Link
                                            to={"/updatecontact/" + contact._id}
                                            className="btn update-btn"
                                        >
                                            Update
                                        </Link>

                                        <button
                                            className="btn-action delete"
                                            onClick={(ev) =>
                                                onDelete(ev, contact._id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                            :

                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center no-data"
                                >
                                    No contacts available.
                                </td>
                            </tr>

                    }

                </tbody>

            </table>

            {/* Pagination */}

            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px"
                }}
            >

                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                {

                    [...Array(totalPages)].map((_, index) => (

                        <button
                            key={index}
                            onClick={() => setPage(index + 1)}
                            style={{
                                backgroundColor:
                                    page === index + 1
                                        ? "skyblue"
                                        : "",
                                padding: "5px 10px"
                            }}
                        >
                            {index + 1}
                        </button>

                    ))

                }

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default Pagination;