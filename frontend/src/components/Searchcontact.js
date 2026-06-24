import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

const Searchcontact = () => {
    let txtValue = useRef();
    let type = useRef();
    let [record, setrecord] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_PATH + "/api/contacts")
            .then((res) => {
                console.log(res.data);
                setrecord(res.data);
            })
    }, [])

    // function onDelete(ev, id) {
    //     console.log(id);
    //     axios.delete("http://localhost:9000/api/contacts/" + id)
    //         .then(res => {
    //             console.log(res.data);
    //             ev.target.parentNode.parentNode.remove();
    //         })
    // }
    function onDelete(ev, id) {
        console.log(id);
        axios.delete(process.env.REACT_APP_API_PATH + "/api/contacts/" + id)
            .then(res => {
                console.log(res.data);
                // FIXED: Instead of manual DOM manipulation, filter the state array
                setrecord(record.filter(contact => (contact._id || contact.id) !== id));
            })
            .catch(err => console.log(err));
    }

    function searchValue(ev) {
        ev.preventDefault();
        let value = txtValue.current.value;
        let typedata = type.current.value;

        axios.post(process.env.REACT_APP_API_PATH + "/api/contacts/search", { type: typedata, value: value })
            .then((res) => {
                console.log(res.data);
                setrecord(res.data);
            })
            .catch((err) => {
                console.log(err.response.data)
            });
    }

    return (
        <div className="table-responsive-container">
            <h3 className="mb-3 text-dark fw-semibold text-center">Search Contact List</h3>

            <form onSubmit={searchValue} className="d-flex gap-2 align-items-center">
                <input
                    type="text"
                    ref={txtValue}
                    className="form-control"
                    placeholder="Search here..."
                />

                <select ref={type} className="form-select w-auto">
                    <option value="name">Name</option>
                    <option value="mobile">Phone</option>
                    <option value="email">Email</option>
                </select>

                <button className="btn btn-secondary px-4">
                    Search
                </button>
            </form>
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
                    {record && record.length > 0 ? (
                        record.map((contact) => (
                            <tr key={contact._id || contact.id}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.mobile}</td>
                                <td className="text-center actions-cell">
                                    <Link to={"/updatecontact/" + contact._id} className="btn update-btn" onClick={() => alert('Update logic')}>
                                        Update
                                    </Link>
                                    <button
                                        className="btn-action delete"
                                        onClick={(ev) => onDelete(ev, contact._id || contact.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center no-data">
                                No contacts available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Searchcontact;