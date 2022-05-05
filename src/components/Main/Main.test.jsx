import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from './Main';
import userEvent from '@testing-library/user-event';
import { mockData } from '../../fixtures/mockData';
import { element } from 'prop-types';
import { click } from '@testing-library/user-event/dist/click';
import { wait } from '@testing-library/user-event/dist/utils';

describe('render component Main', () => {
  it('should render elements main, form, label, select, option', async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    screen.getByRole('main');
    screen.getByRole('form');
    screen.getByText(/select state\/territory:/i);
    screen.getByRole('combobox');
    screen.getAllByRole('option');
  });

  it('should render elements section, p, ul, li, a onChange for element select', async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    const select = screen.getByRole('combobox');
    expect(select.nodeName).toBe('SELECT');

    userEvent.selectOptions(select, 'OR');

    waitFor(() => {
      const loading = screen.getByText(/...loading/i);
      expect(loading.nodeName).toBe('P');

      waitForElementToBeRemoved(loading);
    });

    await waitFor(() => {
      const ul = screen.getByRole('list');
      const li = screen.getAllByRole('listitem');
      const a = screen.getAllByRole('link');

      expect(ul.nodeName).toBe('UL');
      expect(ul.childElementCount).toBe(3);

      li.forEach((element) => {
        expect(element.nodeName).toBe('LI');
        expect(element.childElementCount).toBe(1);
      });

      a.forEach((element) => {
        expect(element.nodeName).toBe('A');
      });
    });
  });

  it('should render elements article, h2, p, section, figure, h3, img, figcaption onClick for element a', async () => {
    render(
      <MemoryRouter initialEntries={['/', '/OR']} initialIndex={1}>
        <Main />
      </MemoryRouter>
    );

    await waitFor(() => {
      const a = screen.getAllByRole('link');
      userEvent.click(a[0]);

      const loading = screen.getByText(/...loading/i);
      expect(loading.nodeName).toBe('P');
      waitForElementToBeRemoved(loading);
    });

    await waitFor(() => {
      const clickedData = mockData.data[0];

      const article = screen.getByRole('article');
      const h2 = screen.getByRole('heading', { level: 2 });
      const p = screen.getByLabelText(/^Description of/i);
      const section = screen.getByRole('region');
      const figures = screen.getAllByRole('figure');
      const h3s = screen.getAllByRole('heading', { level: 3 });
      const imgs = screen.getAllByRole('img');
      const figcaptions = screen.getAllByLabelText(/^Describes/i);

      expect(article.childElementCount).toBe(3);
      expect(h2).toHaveTextContent(clickedData.fullName);
      expect(p).toHaveTextContent(clickedData.description);
      expect(section).toHaveAccessibleName(`images of ${clickedData.fullName}`);
      expect(figures.length).toBe(clickedData.images.length);
      expect(h3s.length).toBe(clickedData.images.length);
      expect(h3s[0]).toHaveTextContent(clickedData.images[0].title);
      imgs.forEach((element) => {
        expect(element).toHaveAttribute('src');
        expect(element).toHaveAttribute('alt');
      });
      expect(imgs[0]).toHaveAttribute('src', `${clickedData.images[0].url}`);
      expect(imgs[0]).toHaveAttribute(
        'alt',
        `${clickedData.images[0].altText}`
      );
      expect(figcaptions.length).toBe(clickedData.images.length);
      expect(figcaptions[0]).toHaveTextContent(clickedData.images[0].caption);
    });
  });
});
