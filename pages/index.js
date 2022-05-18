import React, { useState, useEffect, createContext } from "react";
import Head from "next/head";
import Home1 from "../components/db/db";
import Login from "./company/login";

export default function Home() {
	const [AUTHKEY, setAUTHKEY] = useState("");

	function findAuth() {
		if (process.browser) {
			localStorage.getItem("authkey")
				? setAUTHKEY(localStorage.getItem("authkey").toString())
				: "";
		}
	}

	useEffect(() => {
		findAuth();
	});

	return (
		<>
			<Head>
				<title>Chaya Time</title>
				<meta
					name="description"
					content="Shop App created by Abipravi"
				/>
				<link rel="icon" href="/download.png" />
				
			</Head>
			
			{AUTHKEY !== "" ? <Home1 /> : <Login authcheck={findAuth} />}
		</>
	);
}
