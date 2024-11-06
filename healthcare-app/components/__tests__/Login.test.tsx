import React from "react";
import { fireEvent,render } from "@testing-library/react-native";
import Login from "../Login";

describe("Login", () => {
    it("renders correctly", () => {
        render(<Login/>);
    })
});