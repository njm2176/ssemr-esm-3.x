import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./header.component";

describe("Header Component", () => {
	it("should render without failing", () => {
		render(<Header />);
		const header = screen.getByTestId("header");
		
		expect(header).toBeInTheDocument();
	})
})