import { render } from '@testing-library/react';
import Home from '@/app/page';

test('Home은 Null을 반환한다.', async () => {
  const { container } = render(<Home />);
  expect(container.firstChild).toBeNull();
});
