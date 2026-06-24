import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Showcontactbook = () => {
    let [record, setrecord] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_PATH+"/api/contacts")
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

    return (
        <div className="table-responsive-container">
            <h2 className="mb-3 text-dark fw-semibold text-center">Contact List</h2>

            <div className="table-responsive shadow-sm rounded">
                <table className="table table-striped table-hover align-middle mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col" className="ps-3">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {record && record.length > 0 ? (
                            record.map((contact) => (
                                <tr key={contact._id || contact.id}>
                                    <td className="ps-3 fw-medium">{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.mobile}</td>
                                    <td className="text-center">
                                        <div className="d-flex gap-2 justify-content-center">
                                            <Link
                                                to={"/updatecontact/" + (contact._id || contact.id)}
                                                className="btn btn-sm btn-primary"
                                                onClick={() => alert('Update logic')}
                                            >
                                                Update
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={(ev) => onDelete(ev, contact._id || contact.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-muted bg-light">
                                    No contacts available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Showcontactbook;