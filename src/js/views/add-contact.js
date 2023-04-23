import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const AddContact = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [newContact, setNewContact] = useState({full_name:"", email: "", agenda_slug: "testtesttest", phone: "", address: ""});

    //createUser create a new user. It gets the user data from the store contactList array of objects in flux.
    const createUser = async () => {
       const response = await fetch("https://assets.breatheco.de/apis/fake/contact/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact)
        });
        if(response.ok){
             await actions.getList();
             navigate("/")
            } 
       }; 
     
    return (
        <div className="container">
            <div><h1>Add a new contact</h1></div>

            <div className="d-flex justify-context-end">
				<Link to="/" className="btn btn-success">
					Home
				</Link>
            </div>

            <div>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input type="text" value={newContact.full_name} placeholder="Full Name" className="form-control" id="fullName" onChange={e=> setNewContact(
                        {...newContact, full_name: e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" value={newContact.email} placeholder="Enter email" className="form-control" id="exampleInputEmail1" onChange={(e)=> setNewContact(
                        {...newContact, email: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="number" className="form-label">Phone number</label>
                    <input type="number" value={newContact.phone} placeholder="Enter phone number" className="form-control" id="number" onChange={(e)=> setNewContact(
                        {...newContact, phone: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" value={newContact.address} placeholder="Enter address" className="form-control" id="address" onChange={(e)=> setNewContact(
                        {...newContact, address: e.target.value})} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={()=> {createUser(); }}>Save</button>
            </div>
        </div>
    )
}