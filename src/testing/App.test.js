import NotFound from '../pages/NotFound'
import cars, { initialState as carState } from '../reducers/cars'
import user, { initialState as userState } from '../reducers/user'
import { render, screen } from '@testing-library/react';
import { listCars, filter } from '../dataDummy'
import { GET_LIST_CARS, FILTERED_CARS, GET_DETAIL_CAR } from '../actions/CarsAction'

describe("pages test", () => {
  it('renders not-found page', () => {
    render(<NotFound />);
    const linkElement = screen.getByText(/Not Found/i);
    expect(linkElement).toBeInTheDocument();
  });
})

describe("reducer car test", () => {
  it('should return initial state', () => {
    expect(cars(undefined, "")).toEqual(carState)
  })

  it('should handle GET_LIST_CARS', () => {
    expect(cars(undefined, {
      type: GET_LIST_CARS,
      payload: {
        loading: false,
        data: listCars.data,
        errorMessage: false
      }
    })).toEqual({
      ...carState,
      getListCarsResult: listCars.data
    })
  })

  it('should handle GET_DETAIL_CAR', () => {
    expect(cars(undefined, {
      type: GET_DETAIL_CAR,
      payload: {
        loading: false,
        data: listCars.data.filter((car) => car.id === filter.id),
        errorMessage: false
      }
    })).toEqual({
      ...carState,
      getDetailCarResult: listCars.data.filter((car) => car.id === filter.id),
    })
  })

  it('should handle FILTERED_CARS', () => {
    expect(cars(undefined, {
      type: FILTERED_CARS,
      payload: {
        loading: false,
        data: listCars.data.filter((car) => car.available === filter.available && car.capacity >= filter.capacity && (new Date(car.availableAt) <= filter.availableAt)),
        errorMessage: false
      }
    })).toEqual({
      ...carState,
      filteredCarsResult: listCars.data.filter((car) => car.available === filter.available && car.capacity >= filter.capacity && (new Date(car.availableAt) <= filter.availableAt)),
    })
  })
})

describe("reducer user test", () => {
  it('should return initial state', () => {
    expect(user(undefined, {})).toEqual(userState)
  })
})

describe("token test", () => {
  const key = 'token';
  const value = { token: 'json data' };
  it('should set data into local storage', () => {
    window.localStorage.setItem(key, JSON.stringify(value));
    expect(localStorage.getItem(key)).toEqual(
      JSON.stringify(value)
    )
  })
})

afterEach(() => {
  window.localStorage.clear();
});