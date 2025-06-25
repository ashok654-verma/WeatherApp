import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CityInput from '../CityInput';

describe('CityInput', () => {
  it('should trigger onSubmit when button is pressed', () => {
    const mockSubmit = jest.fn();
    const { getByText } = render(
      <CityInput city="Indore" onChange={() => {}} onSubmit={mockSubmit} />
    );
    fireEvent.press(getByText('Search'));
    expect(mockSubmit).toHaveBeenCalled();
  });
});
