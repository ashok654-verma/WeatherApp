import React from 'react';
import { render } from '@testing-library/react-native';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('displays error text', () => {
    const { getByText } = render(<ErrorMessage message="Something went wrong" />);
    expect(getByText('Something went wrong')).toBeTruthy();
  });
});
