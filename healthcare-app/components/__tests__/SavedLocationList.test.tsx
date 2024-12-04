import React from 'react';
import { render } from '@testing-library/react-native';
import SavedLocationList from '../SavedLocationList'; // Adjust path as needed

describe('SavedLocationList', () => {
  it('should render the title correctly', () => {
    const { getByText } = render(<SavedLocationList locations={[]} />);

    // Check if the title "Saved Locations" is rendered
    expect(getByText('Saved Locations')).toBeTruthy();
  });

  it('should render locations correctly', () => {
    const locations = ['New York', 'Los Angeles', 'Chicago'];
    const { getByText } = render(<SavedLocationList locations={locations} />);

    // Check if all locations are rendered
    locations.forEach((location) => {
      expect(getByText(location)).toBeTruthy();
    });
  });

  it('should handle empty locations list', () => {
    const { queryByText } = render(<SavedLocationList locations={[]} />);

    // Check if no locations are rendered
    expect(queryByText('New York')).toBeNull();
    expect(queryByText('Los Angeles')).toBeNull();
    expect(queryByText('Chicago')).toBeNull();
  });

  it('should render the correct number of locations in FlatList', () => {
    const locations = ['San Francisco', 'Miami', 'Boston'];
    const { getAllByText } = render(<SavedLocationList locations={locations} />);

    // Check if the correct number of locations are rendered
    const locationElements = getAllByText(/.*/); // Match any text
    expect(locationElements.length).toBe(locations.length + 1); // +1 for the title text
  });
});
