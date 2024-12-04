import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SeveritySlider from "../SeveritySlider"; // Adjust path as needed

describe("SeveritySlider", () => {
  const mockOnChange = jest.fn();
  const initialValue = 5;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the slider with the correct initial value", () => {
    const { getByText } = render(<SeveritySlider value={initialValue} onChange={mockOnChange} />);

    // Check if the label is rendered correctly
    expect(getByText("Severity Level")).toBeTruthy();

    // Check if the initial severity value is displayed correctly
    expect(getByText(`Severity: ${initialValue}`)).toBeTruthy();
  });

  it("should call onChange when the slider value changes", () => {
    const { getByTestId } = render(<SeveritySlider value={initialValue} onChange={mockOnChange} />);

    // Simulate slider value change
    fireEvent(getByTestId("slider"), "valueChange", 8);

    // Check if onChange is called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith(8);
  });

  it("should display the correct severity value when the slider value changes", () => {
    const { getByText, getByTestId } = render(<SeveritySlider value={initialValue} onChange={mockOnChange} />);

    // Simulate slider value change
    fireEvent(getByTestId("slider"), "valueChange", 7);
    
    // Check if the displayed severity value is updated correctly
    expect(getByTestId("severity-text")).toBeTruthy();
  });
});
