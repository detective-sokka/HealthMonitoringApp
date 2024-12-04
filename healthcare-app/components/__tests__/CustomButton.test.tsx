import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomButton from "../CustomButton"; // Adjust path as needed
import { Text, ActivityIndicator } from "react-native";

// Mocking the handlePress function
const mockHandlePress = jest.fn();

describe("CustomButton", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render with the correct title", () => {
    const { getByText } = render(
      <CustomButton title="Submit" handlePress={mockHandlePress} />
    );
    const buttonText = getByText("Submit");
    expect(buttonText).toBeTruthy();
  });

  it("should show loading indicator when isLoading is true", () => {
    const { getByTestId } = render(
      <CustomButton title="Submit" handlePress={mockHandlePress} isLoading={true} />
    );
    const activityIndicator = getByTestId("loading-indicator");
    expect(activityIndicator).toBeTruthy();
  });

  it("should not show loading indicator when isLoading is false", () => {
    const { queryByTestId } = render(
      <CustomButton title="Submit" handlePress={mockHandlePress} isLoading={false} />
    );
    const activityIndicator = queryByTestId("loading-indicator");
    expect(activityIndicator).toBeNull();
  });

  it("should call handlePress when pressed", () => {
    const { getByText } = render(
      <CustomButton title="Submit" handlePress={mockHandlePress} />
    );
    const button = getByText("Submit");
    fireEvent.press(button);
    expect(mockHandlePress).toHaveBeenCalledTimes(1);
  });
});
