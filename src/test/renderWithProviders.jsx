import React from 'react';
import { render } from '@testing-library/react';

/**
 * Render helper that wraps components with the same providers used by the app.
 *
 * @param {React.ReactElement} ui - Component under test.
 * @param {object} [options]
 * @param {string[]} [options.initialEntries] - Initial router entries.
 * @returns {RenderResult}
 */
export function renderWithProviders(ui, { initialEntries = ['/'] } = {}) {
  return render(
    <HelmetProvider>
      <ThemeProvider>
        <CustomProvider>
          <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
        </CustomProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
