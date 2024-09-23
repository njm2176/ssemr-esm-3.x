import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SsemrListTabComponent from "./ssemr-list-tab.component";

describe("Tab Components", () => {
	const handlerMock = jest.fn();

	const defaultProps = {
		disabled: false,
		name: "SSEMR",
		handler: handlerMock,
		isActive: false,
		activeClassName: "active",
		inertClassName: "inactive",
	}
	it("should render without failing", () => {
		render(<SsemrListTabComponent {...defaultProps} />);
		const button = screen.getByRole("button", { name: "SSEMR" });

		expect(button).toBeInTheDocument();
	})

	it("should call handler when button is clicked", () => {
		render(<SsemrListTabComponent {...defaultProps} />);
		const button = screen.getByRole("button", { name: "SSEMR" });

		fireEvent.click(button);
		expect(handlerMock).toHaveBeenCalled();
	})

	// it("should not call handler when button is clicked and is active", () => {
	// 	render(<SsemrListTabComponent {...defaultProps} isActive={true} />);
	// 	const button = screen.getByRole("button", { name: "SSEMR" });

	// 	fireEvent.click(button);
	// 	expect(handlerMock).not.toHaveBeenCalled();
	// })
})