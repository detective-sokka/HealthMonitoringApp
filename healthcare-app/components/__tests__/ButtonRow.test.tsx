import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ButtonRow from '../ButtonRow';

describe('ButtonRow Component', () => {
  it('should render without crashing', () => {
    const { getByText } = render(
      <ButtonRow
        buttons={[
          { title: 'Button 1', onPress: jest.fn() },
        ]}
      />
    );

    // Check if Button 1 is rendered
    expect(getByText('Button 1')).toBeTruthy();
  });

  it('should render multiple buttons', () => {
    const { getByText } = render(
      <ButtonRow
        buttons={[
          { title: 'Button 1', onPress: jest.fn() },
          { title: 'Button 2', onPress: jest.fn() },
        ]}
      />
    );

    // Check if both buttons are rendered
    expect(getByText('Button 1')).toBeTruthy();
    expect(getByText('Button 2')).toBeTruthy();
  });

  it('should call the correct onPress handler when a button is pressed', () => {
    const onPress1 = jest.fn();
    const onPress2 = jest.fn();

    const { getByText } = render(
      <ButtonRow
        buttons={[
          { title: 'Button 1', onPress: onPress1 },
          { title: 'Button 2', onPress: onPress2 },
        ]}
      />
    );

    // Simulate pressing the first button
    fireEvent.press(getByText('Button 1'));
    expect(onPress1).toHaveBeenCalled();

    // Simulate pressing the second button
    fireEvent.press(getByText('Button 2'));
    expect(onPress2).toHaveBeenCalled();
  });
});
