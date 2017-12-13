// Jest

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('calls the mock moviesAPI.all() function', () => {
  jest.mock('./api/movies');
  const allMockFunction = jest.fn().mockName('allMockFunction')
  App.mockImplementation(() => {
    return {
      all: allMockFunction
    }
  })
  
  const app = new App();
  app.all();
  expect(allMockFunction).toHaveBeenCalled();
});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

// Enzyme

// import React from 'react';
// import { shallow } from 'enzyme';
// import App from './App';

// it('renders without crashing', () => {
//   shallow(<App />);
// });