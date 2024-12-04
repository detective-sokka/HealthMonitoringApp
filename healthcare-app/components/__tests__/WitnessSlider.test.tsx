import React from 'react';
import { render } from '@testing-library/react-native';
import Tile from '../Tile'; // Adjust path as needed

describe('Tile', () => {
  const props = {
    label: 'Severity',
    value: 8,
    backgroundColor: '#ff0000',
    description: 'This is a description',
  };

  it('should render the label, value, and description correctly', () => {
    const { getByText } = render(<Tile {...props} />);

    // Check if the label, value, and description are rendered correctly
    expect(getByText('Severity')).toBeTruthy();
    expect(getByText('8')).toBeTruthy();
    expect(getByText('This is a description')).toBeTruthy();
  });

  it('should render without description if not provided', () => {
    const { queryByText } = render(
      <Tile label="Severity" value={8} backgroundColor="#ff0000" />
    );

    // Check if the description is not rendered
    expect(queryByText('This is a description')).toBeNull();
  });

  it('should apply correct styles for label, value, and description', () => {
    const { getByText } = render(<Tile {...props} />);

    // Check styles for label
    const label = getByText('Severity');
    expect(label.props.style.fontSize).toBe(14);
    expect(label.props.style.fontWeight).toBe('500');

    // Check styles for value
    const value = getByText('8');
    expect(value.props.style.fontSize).toBe(30);
    expect(value.props.style.fontWeight).toBe('bold');

    // Check styles for description
    const description = getByText('This is a description');
    expect(description.props.style.fontSize).toBe(13);
  });
});
