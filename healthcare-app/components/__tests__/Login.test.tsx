import React from "react";
import { render } from "@testing-library/react-native";
import Login from "../Login";

describe("Login", () => {
    it("renders correctly", () => {
        render(<Login/>);
    });

    it("displays title text", () => {
        const { queryByText } = render(<Login/>);
        expect(queryByText("Login :")).not.toBeNull();
    });

    it("displays text inputs with correct placeholders", () => {
        const { getByTestId, getByPlaceholderText } = render(<Login/>);
        expect(getByTestId("username")).not.toBeNull();
        expect(getByTestId("password")).not.toBeNull();        
    });

    it("displays submit button", () => {
        const { getByTestId } = render(<Login/>);
        const submitButton = getByTestId("submit");
        expect(submitButton).not.toBeNull();
    });
});