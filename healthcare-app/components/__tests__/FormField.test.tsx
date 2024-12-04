import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FormField from "../FormField"; // Adjust path as needed

describe("FormField", () => {
  const mockHandleChangeText = jest.fn();

  const props = {
    title: "Password",
    value: "testpassword",
    handleChangeText: mockHandleChangeText,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render with the correct title and value", () => {
    const { getByText, getByDisplayValue } = render(<FormField {...props} />);

    // Check if the title and value are rendered correctly
    expect(getByText("Password")).toBeTruthy();
    expect(getByDisplayValue("testpassword")).toBeTruthy();
  });

  it("should call handleChangeText when the input value changes", () => {
    const { getByDisplayValue } = render(<FormField {...props} />);

    // Simulate text input change
    fireEvent.changeText(getByDisplayValue("testpassword"), "newpassword");

    // Check if handleChangeText was called with the correct argument
    expect(mockHandleChangeText).toHaveBeenCalledWith("newpassword");
  });

  it("should toggle password visibility when the eye icon is clicked", () => {
    const { getByTestId, queryByTestId } = render(
      <FormField {...props} />
    );
  
    // Check if the initial icon is the "eye" icon (password is hidden)
    expect(queryByTestId("eye-icon")).toBeTruthy();
  
    // Click the eye icon to show the password
    fireEvent.press(getByTestId("eye-icon"));
  
    // Check if the "eyeHide" icon is shown now (password should be visible)
    expect(queryByTestId("eyeHide-icon")).toBeTruthy();
  
    // Click again to hide the password
    fireEvent.press(getByTestId("eyeHide-icon"));
  
    // Check if the "eye" icon is back (password should be hidden again)
    expect(queryByTestId("eye-icon")).toBeTruthy();
  });
  

  it("should pass secureTextEntry prop correctly", () => {
    const { getByDisplayValue, queryByTestId } = render(<FormField {...props} />);

    // Check if secureTextEntry is set to true initially (password is hidden)
    expect(getByDisplayValue("testpassword").props.secureTextEntry).toBe(true);

    // After toggling, check if secureTextEntry is set to false (password is shown)
    fireEvent.press(queryByTestId("eye-icon"));
    expect(getByDisplayValue("testpassword").props.secureTextEntry).toBe(false);
  });
});
