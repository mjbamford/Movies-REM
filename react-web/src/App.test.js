// Jest

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Jest Mock Function
jest.mock('movies'); // src/__mocks__/movies.js

// Assertion for a promise must be returned.
it('works with promises on mock functions', () => {
  expect.assertions(1);
  return App.getMovies().then(data => expect(data.token).toEqual('mytoken'));
});

describe("Movie component with API call", function () {
  beforeEach(function() {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({token: 'myjwt'}));
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});

// Enzyme

// import React from 'react';
// import { shallow } from 'enzyme';
// import App from './App';

// it('renders without crashing', () => {
//   shallow(<App />);
// });