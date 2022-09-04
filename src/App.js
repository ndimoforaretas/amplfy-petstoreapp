import { useState } from "react";
import "./App.css";
import { Pets } from "./ui-components";
import { NavBar } from "./ui-components";
import { Footer } from "./ui-components";

import { AddPet } from "./ui-components";
import { PetDetails } from "./ui-components";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Storage } from "@aws-amplify/storage";

function App({ user, signOut }) {
	async function saveFile() {
		await Storage.put("test.txt", "Hello");
	}

	const [showForm, setShowForm] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const [pet, setPet] = useState();

	const [updatePet, setUpdatePet] = useState();

	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [breed, setBreed] = useState("");
	const [about, setAbout] = useState("");
	const [color, setColor] = useState("");
	const [image, setImage] = useState("");

	const petDetailsOverride = {
		Close: {
			style: {
				cursor: "pointer",
			},

			onClick: () => {
				setShowDetails(false);
			},
		},
	};

	const formOverride = {
		TextField29766922: {
			placeholder: name,
		},
		TextField29766923: {
			placeholder: age,
		},
		TextField29766924: {
			placeholder: breed,
		},
		TextField34542712: {
			placeholder: about,
		},
		TextField34552741: {
			placeholder: image,
		},
		TextField34542719: {
			placeholder: color,
		},
		image: {
			src:
				updatePet == null
					? "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=438&q=80"
					: updatePet.image,
		},
		Button34542734: {
			isDisabled: !updatePet ? true : false,
		},
		Button29766926: {
			isDisabled: updatePet ? true : false,
		},

		Icon: {
			style: {
				cursor: "pointer",
			},

			onClick: () => {
				setShowForm(false);
			},
		},
	};

	const navbarOverrides = {
		image: {
			// src: "https://img.icons8.com/color/50/000000/lion",
			src: user?.attributes?.profile,
		},
		"Add Pet": {
			style: {
				cursor: "pointer",
			},
			onClick: () => {
				setShowForm(!showForm);
				saveFile();
			},
		},
		Button: {
			style: {
				cursor: "pointer",
			},

			onClick: signOut,
		},
	};

	return (
		<div className="App">
			<NavBar width={"100%"} overrides={navbarOverrides} />
			<header className="App-header">
				{showDetails && (
					<PetDetails
						pet={pet}
						style={{ textAlign: "left", margin: " 2rem" }}
						overrides={petDetailsOverride}
					/>
				)}

				{showForm && (
					<AddPet
						pet={updatePet}
						overrides={formOverride}
						style={{ textAlign: "left", margin: "1rem" }}
					/>
				)}
				<Pets
					overrideItems={({ item, index }) => ({
						overrides: {
							"Breed: Canine": { color: "red" },
							Button29766907: {
								onClick: () => {
									setShowDetails(!showDetails);
									setPet(item);
								},
							},
							Button34512690: {
								onClick: () => {
									if (!showForm) setShowForm(true);
									setUpdatePet(item);
									setName(item.name);
									setAge(item.age);
									setBreed(item.breed);
									setAbout(item.about);
									setColor(item.color);
									setImage(item.image);
								},
							},
						},
					})}
				/>
			</header>
			<Footer width={"100%"} />
		</div>
	);
}

export default withAuthenticator(App);
