import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [editContact, setEditContact] = useState({full_name:"", email: "", agenda_slug: "testtesttest", phone: "", address: ""}); //|| ''

    useEffect(() => {
        //move function editUser to flux
        getEditUser()
    }, []);

    const sendEditUser = async () => {
        const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${params.theid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editContact)
        });
        if (response.ok) {
            await actions.getList();
            navigate("/")
        }
    };

    // gets the user. It just needs the  id of the user you want to get.
    const getEditUser = async () => {
        const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${params.theid}`)
        const data = await response.json();
        setEditContact(data);
    };


    return (
        <div className="container">
            <div><h1>Edit contact</h1></div>

            <div className="d-flex justify-context-end">
                <Link to="/" className="btn btn-success">
                    Home
                </Link>
            </div>

            <div>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input type="text" value={editContact.full_name} placeholder="Full Name" className="form-control" id="fullName" onChange={e => setEditContact(
                        { ...editContact, full_name: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" value={editContact.email} placeholder="Enter email" className="form-control" id="exampleInputEmail1" onChange={(e) => setEditContact(
                        { ...editContact, email: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="number" className="form-label">Phone number</label>
                    <input type="number" value={editContact.phone} placeholder="Enter phone number" className="form-control" id="number" onChange={(e) => setEditContact(
                        { ...editContact, phone: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" value={editContact.address} placeholder="Enter address" className="form-control" id="address" onChange={(e) => setEditContact(
                        { ...editContact, address: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={() => { sendEditUser(); }}>Save</button>
            </div>
        </div>
    )
}