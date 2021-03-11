const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contact: {
				full_name: "",
				email: "",
				phone: "",
				address: "",
				agenda_slug: "lila"
			},
			contactList: []
		},
		actions: {
			onChangeContact: e => {
				const store = getStore();
				const { contact } = store;
				contact[e.target.name] = e.target.value;
				setStore({ contact });
				console.log(e.target.value);
			},
			onSubmitContact: async e => {
				e.preventDefault();
				const store = getStore();
				const { contact } = store;

				const config = {
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify(contact)
				};

				const res = await fetch("https://assets.breatheco.de/apis/fake/contact/", config);
				const data = await res.json();

				console.log(data);
			},
			getContacts: async () => {
				const config = {
					method: "GET",
					headers: { "Content-Type": "application/json" }
				};
				const res = await fetch("https://assets.breatheco.de/apis/fake/contact/agenda/lila", config);
				const data = await res.json();

				setStore({ contactList: data });
			}
		}
	};
};

export default getState;
