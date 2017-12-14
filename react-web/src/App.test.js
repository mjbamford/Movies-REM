import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { assert } from 'chai';
import { spy } from 'sinon';
import App from './App';

// Jest Mock Function
jest.mock('movies'); // src/__mocks__/movies.js

describe("Movie component with API call", function () {
  beforeEach(function() {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({token: 'myjwt'}));
  });

  // Enzyme
  it('renders without crashing using Enyzme approach', () => {
    shallow(<App />);
  });

  // Default
  it('renders without crashing using default approach', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('with shallow mount it shows the MovieForm component by default', () => {
    const wrapper = mount(<App />);
    const container = wrapper.first('div');
    const movieFormComponent = wrapper.find('MovieForm');
    
    assert.equal(container.length, 1);
    assert.equal(movieFormComponent.length, 1);
  });

  it('should show the <MoviesList /> component when it has loaded movies', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({movies: [ { title: 'Around the Block', yearReleased: 2018 } ]});
    const moviesListComponent = wrapper.find('MoviesList');
    // console.log( wrapper.debug() )

    assert.equal(moviesListComponent.length, 1);
    // expect(wrapper.find('MoviesList')).to.have.length(1);
  });

  it('calls componentDidMount() lifecycle method', () => {
    const componentDidMountSpy = spy(App.prototype, 'componentDidMount');
    const wrapper = mount(<App />);

    assert.ok(App.prototype.componentDidMount.calledOnce);

    componentDidMountSpy.restore();
  });

  // Assertion for a promise must be returned.
  it('works with promises on mock functions', () => {
    expect.assertions(1);
    return App.getMovies().then(data => expect(data.token).toEqual('mytoken'));
  });
});


