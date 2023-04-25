import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Home = () => {
	const { store, actions } = useContext(Context);

	//deleteUser delete's the user. It just needs the id of the user you want to delete.
	const deleteUser = async (contactId) => {

		const response = await fetch("https://assets.breatheco.de/apis/fake/contact/" + contactId, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
		if (response.ok) await actions.getList();
	};

	return (
		<div className="container mt-5">
			<h1>Contact List</h1>

			<div className="d-flex">
				<Link to="/contact" className="btn btn-primary d-flex justify-context-end">
					Add new contact
				</Link>
			</div>

			{store.contacts.map((contact) => {
				return <div key={contact.id} className="row border d-flex justify-context-evenly p-3">
					<div className="col-3 ">
						<img src="https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="rounded-circle" height={"175px"} width={"175"}></img>
					</div>
					<div className="col-6">
						<h5>{contact.full_name}</h5>
						<p>{contact.email}</p>
						<p>{contact.address}</p>
						<p>{contact.phone}</p>
					</div>
					<div className="col-3">
						<Link to={"/editcontact/" + contact.id}>
							<button className="btn btn-success me-3">Edit</button>
						</Link>
						<button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#staticBackdrop" + contact.id}>
							Delete
						</button>
						<div className="modal fade" id={"staticBackdrop" + contact.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={"staticBackdropLabel" + contact.id} aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h1 className="modal-title fs-5" id={"staticBackdropLabel" + contact.id}>Delete Contact</h1>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="modal-body">
										Are you sure you want to delete conatact?
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
										<button type="button" className="btn btn-danger" onClick={async (e) => {
											await deleteUser(contact.id), e.target.setAttribute("data-bs-dismiss", "modal")
										}} data-bs-dismiss="modal">OK</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			})}
		</div>
	)
};
