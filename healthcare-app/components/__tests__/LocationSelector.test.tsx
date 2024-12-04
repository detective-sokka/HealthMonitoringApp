import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LocationSelector from "../LocationSelector"; // Adjust path as needed
import FormField from "../FormField"; // Ensure correct path to FormField component

describe("LocationSelector", () => {
  const mockOnLocationChange = jest.fn();

  const props = {
    location: "New York",
    onLocationChange: mockOnLocationChange,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render with correct label and value", () => {
    const { getByText } = render(<LocationSelector {...props} />);

    // Check if the "Location" label is rendered
    expect(getByText("Location")).toBeTruthy();
    
    // Check if the selected location ("New York") is rendered
    expect(getByText("New York")).toBeTruthy();
  });

  it("should display 'No location selected' when no location is provided", () => {
    const { getByText } = render(
      <LocationSelector location={""} onLocationChange={mockOnLocationChange} />
    );

    // Check if the default value "No location selected" is rendered
    expect(getByText("No location selected")).toBeTruthy();
  });

  it("should call onLocationChange when the location input changes", () => {
    const { getByPlaceholderText } = render(<LocationSelector {...props} />);

    // Find the input field by its placeholder text
    const inputField = getByPlaceholderText("Enter custom location");

    // Simulate text change
    fireEvent.changeText(inputField, "Los Angeles");

    // Verify that onLocationChange was called with the correct value
    expect(mockOnLocationChange).toHaveBeenCalledWith("Los Angeles");
  });

  it("should render FormField with correct props", () => {
    const { getByPlaceholderText } = render(<LocationSelector {...props} />);

    // Verify that the FormField component is rendered with the correct placeholder
    const inputField = getByPlaceholderText("Enter custom location");
    expect(inputField).toBeTruthy();
  });
});
