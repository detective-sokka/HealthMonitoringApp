import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Dropdown from "../Dropdown"; // Adjust path as needed

describe("Dropdown", () => {
  const mockOnSelectOption = jest.fn();

  const props = {
    options: ["Option 1", "Option 2", "Option 3"],
    selectedOption: "Option 1",
    onSelectOption: mockOnSelectOption,
    label: "Select an option",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render with correct label and selected option", () => {
    const { getByText } = render(<Dropdown {...props} />);

    // Check that the label and selected option are rendered
    expect(getByText("Select an option")).toBeTruthy();
    expect(getByText("Option 1")).toBeTruthy();
  });

  it("should open the modal when the dropdown is pressed", async () => {
    const { getByTestId } = render(
      <Dropdown
        options={["Option 1", "Option 2", "Option 3"]}
        selectedOption={null}
        onSelectOption={() => {}}
        label="Select an option"
      />
    );
  
    // Simulate pressing the dropdown button to open the modal
    fireEvent.press(getByTestId("dropdown-button"));
  
    // Wait for the modal background to appear
    await waitFor(() => getByTestId("modal-background"));
  
    // Check if the modal background is visible
    expect(getByTestId("modal-background")).toBeTruthy();
  });  
  

  it("should call onSelectOption when an option is selected", () => {
    const { getByText } = render(<Dropdown {...props} />);

    // Open the modal
    fireEvent.press(getByText("Option 1"));

    // Select the second option
    fireEvent.press(getByText("Option 2"));

    // Verify that onSelectOption is called with the correct argument
    expect(mockOnSelectOption).toHaveBeenCalledWith("Option 2");
  });

  it("should close the modal when the close button is pressed", () => {
    const { getByText, queryByTestId } = render(<Dropdown {...props} />);

    // Open the modal
    fireEvent.press(getByText("Option 1"));

    // Check if the modal is visible
    expect(queryByTestId("modal-background")).toBeTruthy();

    // Press the close button
    fireEvent.press(getByText("Close"));

    // Check if the modal is closed
    expect(queryByTestId("modal-background")).toBeNull();
  });
});
