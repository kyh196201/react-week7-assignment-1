import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { DESCRIPTION, SCORE } from '../fixtures/review';

import RestaurantContainer from './RestaurantContainer';

describe('RestaurantContainer', () => {
  given('reviewFields', () => ({
    score: '',
    description: '',
  }));

  const dispatch = jest.fn();

  function renderRestaurantContainer() {
    return render(<RestaurantContainer restaurantId="1" />);
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      restaurant: given.restaurant,
      reviewFields: given.reviewFields,
    }));
  });

  it('dispatches action', () => {
    renderRestaurantContainer();

    expect(dispatch).toBeCalled();
  });

  context('with restaurant', () => {
    given('restaurant', () => ({
      id: 1,
      name: '마법사주방',
      address: '서울시 강남구',
    }));

    it('renders name and address', () => {
      const { container } = renderRestaurantContainer();

      expect(container).toHaveTextContent('마법사주방');
      expect(container).toHaveTextContent('서울시');
    });

    it('renders review form', () => {
      const { getByLabelText, getByText } = renderRestaurantContainer();

      expect(getByLabelText('평점')).toBeInTheDocument();
      expect(getByLabelText('리뷰 내용')).toBeInTheDocument();
      expect(getByText('리뷰 남기기')).toBeInTheDocument();
    });

    context('with score and description', () => {
      given('reviewFields', () => ({
        score: SCORE,
        description: DESCRIPTION,
      }));

      it('it renders current score and description', () => {
        const { getByLabelText } = renderRestaurantContainer();

        expect(getByLabelText('평점')).toHaveDisplayValue(SCORE);
        expect(getByLabelText('리뷰 내용')).toHaveDisplayValue(DESCRIPTION);
      });
    });

    context('without score and description', () => {
      given('reviewFields', () => ({
        score: '',
        description: '',
      }));

      it('it renders empty score and description', () => {
        const { getByLabelText } = renderRestaurantContainer();

        expect(getByLabelText('평점')).toHaveDisplayValue('');
        expect(getByLabelText('리뷰 내용')).toHaveDisplayValue('');
      });
    });
  });

  context('without restaurant', () => {
    given('restaurant', () => null);

    it('renders loading', () => {
      const { container } = renderRestaurantContainer();

      expect(container).toHaveTextContent('Loading');
    });
  });
});
