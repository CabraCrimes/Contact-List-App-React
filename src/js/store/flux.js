const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			contacts: []


		},

		actions: {

			//getList gets the whole list of users, so you can see all the users you have.
			getList: async () => {
				const response = await fetch("https://assets.breatheco.de/apis/fake/contact/agenda/testtesttest")
				const data = await response.json();
				setStore({contacts: data})
			},

			//updateUser updates the user. It just needs the id of the user you want to update.
			updateUser: async () => {
				await fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"full_name": "Random Person",
						"email": "example@gmail.com",
						"agenda_slug": "testtesttest",
						"address": "47568 NW 34ST, 33434 FL, USA",
						"phone": "123446789"
					})
				})
			},
			
			//createList creates a new seprate list in a new genda_slug
			createList: async () => {
				await fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"full_name": "Elon Musk",
						"email": "example@example.com",
						"agenda_slug": "testtesttest",
						"address": "Spain",
						"phone": "7864445566"
					})
				})

			}
		}
	};
};

export default getState;
