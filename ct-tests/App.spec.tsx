import { test, expect } from '@playwright/experimental-ct-react17';
import App from '../src/App';
import { MemoryRouter } from 'react-router-dom';

test.describe('App Navigation', () => {

  test('should navigate to /small-loan by default', async ({ mount }) => {
    const component = await mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
    );

    await expect(component).toContainText('Calculate your monthly payment');
  });

  test('should redirect to /small-loan from /loan-decision if loanDetails or authData is missing', async ({ mount }) => {
    const component = await mount(
        <MemoryRouter initialEntries={['/loan-decision']}>
          <App />
        </MemoryRouter>
    );

    await expect(component).toContainText('Calculate your monthly payment');
  });

  test('should redirect unknown route to /small-loan', async ({ mount }) => {
    const component = await mount(
        <MemoryRouter initialEntries={['/unknown-route']}>
          <App />
        </MemoryRouter>
    );
    await expect(component).toContainText('Calculate your monthly payment');
  });
});
