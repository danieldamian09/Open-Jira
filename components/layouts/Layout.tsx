import {FC} from "react";
import Head from "next/head";
import {Box} from "@mui/system";
import React from "react";

interface Props {
	title?: string;
	children: React.ReactNode;
}

export const Layout: FC<Props> = ({title = "OpenJira - App", children}) => {
	return (
		<Box sx={{flexFlow: 1}}>
			<Head>
				<title>{title}</title>
			</Head>
			{/* Navbar */}

			{/* Sidebar */}

			<Box sx={{padding:'10px 20px'}}>{children}</Box>
		</Box>
	);
};
