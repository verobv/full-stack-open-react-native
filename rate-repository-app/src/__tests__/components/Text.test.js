import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

const Greeting = ({ name }) => {
  return (
    <View>
      <Text>Hello {name}!</Text>
    </View>
  );
};

describe('Greeting', () => {
  it('renders a greeting message based on the name prop', async () => {
    const { getByText } = await render(<Greeting name="Kalle" />);

    expect(getByText('Hello Kalle!')).toBeDefined();
  });
});