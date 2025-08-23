import { screen } from '@testing-library/react';
import LocalePage from '@/app/[locale]/page';
import { renderWithQueryClient } from '../../helpers/renderWithQueryClient';

describe('LocalePage (Merchants) 를 렌더링 했을 때, Merchants 텍스트가 정상적으로 노출된다.', () => {
  it('renders a heading level 2', async () => {
    const params = Promise.resolve({ locale: 'en' });
    const ui = await LocalePage({ params });

    renderWithQueryClient(ui);

    const heading = await screen.findByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Merchants');
  });
});
