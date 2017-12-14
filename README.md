## README

* Recap

  * Presentation from Ric using Local Storage `getItem` and `setItem` to store and retrieve the JWT - https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage
  * Demo
    ```
    window.localStorage.setItem('token', 'abc');
    window.localStorage.getItem('token');
    ```
  * Show location of Local Storage in browser
    * Chrome Inspector > Application > Storage > Local Storage

* Intro

  * **Jest Test Runner** (alternative is Mocha) that grabs the test files and associated configuration and then executes them and writes test results to console
  
  * Expectation vs Actual - Matchers to check proper values returned

  * **Mocking Objects Types (aka Test Doubles)** are used for Asyncronous calls
    * Dummy objects - passed around but not actually used other than to fill parameter lists.
    * Fake objects - simplified implementation, not suitable for production (with same interface as real object being mocked), used to avoid side-effects caused by using real objects
    * Stubs - predefined answers to test calls
    * Spies (enhanced Stub) - record how SUT makes calls to check performing correctly
      * Replace Mocked class Methods with Spy Methods
      * Add Spy Methods replace actual function and **Intercept** calls to Real freestanding (i.e. callback) functions. **Pass-Through Mocking** passes Context and Original Function through as parameters
      * Spies track quantity of times called and parameters provided  
    * Mock - 
      * Pre-programmed specification of calls expected to receive
      * Verification checks that mocks receive all expected calls
      * Throws exceptions if method receives unexpected calls

    * Reference: 
      * Test Double - https://martinfowler.com/bliki/TestDouble.html
      * Luke's blogpost - https://ltfschoen.github.io/JavaScript-Tests-Mocha-Mocking-Spies/

  * **Mocking Benefits** 
    * Test component isolated from System Under Test (SUT)(i.e. remove costs of interaction with external complex systems)
    * Test interactions between Components

  * Demo 
    * Jasmine Spies and Matchers - https://jasmine.github.io/2.0/introduction.html

  * Libraries
    * Sinon.js is Mocking library (NOT a test framework). It provides Spies, Stubs, Mocks (for any test framework)
      * Sinon.js - http://sinonjs.org/
      * Sinon Spy API - http://sinonjs.org/releases/v2.0.0/spies/
      * Sinon Call API
      * Sinon Assertion API
      * Sinon Stub API `sinon.stub`
      * Sinon Mock `sinon.mock`
        * Sinon Mocks (third form of Test Double provided by SinonJS, similar to Sinon Stubs but have pre-programmed expectations)
      * Sinon Matchers API
        * Matching calls to a Test Double based on args used (without exactly specifying the args). Use them in place of an arg to check if Test Double called correctly
        * Example usage: Create spy, call the spy, and call `sinon.spy().calledWithMatch(sinon.match.number)` method on the spy (passing in one or more Matchers)
      * Sinon Fake Timers (similar to Jasmine's Mock clock). `sinon-ie` is required when working with IE
      * Sinon Fake XMLHttpRequest (Test Double) - controls XHR Object in browser but not all requests will receive a response.
        * Option 1 - `useFakeXmlHttpRequest`
        * Option 2 - `fakeServer` API for hijacking XHR object in browser by seting up a pattern for responses to allow inspection of specific requests/responses
      * FakeXMLHttpRequest API
      * FakeXMLHttpRequest Response API
      * Sandboxing
        * Post-testing to ensure global objects restored to original state, including:
          * Spies, Stubs, Mocks, Fake Timers, Fake XHRs
        * Implement Sandboxing with either
          * Option 1: `sinon.sandbox.create`
          * Option 2: `sinon.test()`
    * Jasmine BDD framework - https://jasmine.github.io/ 
    * Chimp.js (normally QA teams do this) - https://chimp.readme.io/

* About

  * Debugging

    * React Dev Tools Extension     
      * Links
        * https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
        * https://github.com/facebook/react-devtools
      * Install, enable, and refresh http://localhost:3000
      * Go to "React" tab in Chrome Inspector
      * Inspect Props, State, and React Component Structure

    * Breakpoints
      * Go to "Sources" tab in Chrome Inspector
      * Open top > localhost:3000 > Users/.../react-web > src >
      * Add breakpoints, refresh the page, introspect, and step through
      * Enter variables to check their values in Console

  * Testing

    * Jest 
      * Links 
        * **TODO** https://facebook.github.io/jest/
      * Snapshots used to check Components properly render in the UI
      * Coverage reports of proportion of files being tested
      * Matchers used to check proper values returned

* Setup 

  * Database
    ```
    mongod
    ```

  * Server
    ```
    cd api; yarn install; yarn run dev
    ```

  * Client

    * Run 
      ```
      cd react-web; yarn install; yarn start
      ```

    * Test
      ```
      yarn test
      ```

  * Create a new branch to experiment with tests `git checkout -b branch-name`

* Jest Usage
  * Reference: https://github.com/ltfschoen/Movies-REM/blob/master/react-web/README.md#running-tests

  * Running Tests
    * Use for Unit Testing logic and components since last Git commit.
    NOT e2e tests 

  * Location and filenames for Tests
    * Jest finds all in src/ subfolders with:
      * Suffix `.js` only in `__tests__` folders
      * Suffixes `.test.js`, `.jest.js` 
    * Co-locate tests with implementation encouraged

  * CLI
    * `yarn test` runs Jest in Watch mode (i.e. re-run tests on each save)
    * Commands 
      * `a` - run all tests
      * `p` - new test pattern
      * `q` - quit watch mode
      * `Enter` - start test run

  * Code Editor Plugin for VSCode - https://github.com/ltfschoen/Movies-REM/blob/master/react-web/README.md#editor-integration
    * View > Extensions > Enter "Jest", then click "Install"

* Enzyme Usage:
  * Reference:
    * Enzyme - http://airbnb.io/enzyme/

  * Installation
    ```
    yarn add enzyme enzyme-adapter-react-16 react-test-renderer --dev
    ```
  
  * Initialise Test Environment
    * Reference: https://github.com/ltfschoen/Movies-REM/blob/master/react-web/README.md#initializing-test-environment

    * Create `src/setupTests.js` as it will automatically run before running tests. Configure Enzyme to use the Adapter
    
      ```
      import { configure } from 'enzyme';
      import Adapter from 'enzyme-adapter-react-16';

      configure({ adapter: new Adapter() });

      const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn()
      };
      global.localStorage = localStorageMock;
      ```

    * Shallow Rendering with Enzyme - http://airbnb.io/enzyme/#shallow-rendering

    * Change App.test.js to:
      ```
      import React from 'react';
      import { shallow } from 'enzyme';
      import App from './App';

      it('renders without crashing', () => {
        shallow(<App />);
      });
      ```

    * Reasoning: 
      * Global setup before running tests
      * If requirement to Mock an API 

* Basic Jest "smoke test" - https://github.com/ltfschoen/Movies-REM/blob/master/react-web/README.md#srcsetuptestsjs

  * In-built with create-react-app to test component renders without throwing during rendering
  * Open src > components > App.test.js
  * Run `yarn test`

  * Error using Enzyme version of App.test.js:
    ```
    TypeError: Cannot read property 'createEvent' of undefined
    ```
    * Note: Does not identify what part of the code causes the error,
    but when you comment out the `moviesAPI.all() ...` call in 
    `componentDidMount()` then it works, so it's due to the `fetch`

    * Fixed later by adding:
      ```
      beforeEach(function() {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({token: 'myjwt'}));
      });
      ```

  * Error using Jest version of App.test.js:
    ```
    console.log src/api/movies.js:7
      TypeError: Network request failed
      ...
    ```

  * Error `console.log src/api/movies.js:7 TypeError: res.json is not a function`
    when change to:
    ```
    describe("Movie component with API call", function () {
      beforeEach(function() {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({token: 'abc'}));
      });

      it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
      });
    });
    ```

  * Try to resolve by Stubbing the relevant App Component dependencies using Proxyquire
    * References:
      * https://www.npmjs.com/package/proxyquire
      * https://github.com/tomitrescak/proxyrequire

    * Install
      ```
      yarn add proxyquire --dev
      ```

    * Try adding to App.test.js
      ```
      const proxyquire =  require('proxyquire')
      const assert     =  require('assert')
      const pathStub   =  { };

      const moviesAPI = proxyquire('./api/movies', { 
        'path': pathStub 
      });
      // assert.equal(moviesAPI.all(), 'myjwt');

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
      ```

    * Error encountered due to Proxyquire `TypeError: Cannot read property 'bind' of undefined`. 
    Discovered that Jest and Proxyquire are incompatible https://github.com/thlorenz/proxyquire/issues/152
  
  * Try instead Stubbing the App Component dependencies using a Jest Manual Mock
    * Reference: Async Example http://facebook.github.io/jest/docs/en/tutorial-async.html#content
    * Reference: Manual Mocks http://facebook.github.io/jest/docs/en/manual-mocks.html#content

    * Create folder 
      ```
      mkdir -p src/__mocks__ && touch src/__mocks__/movies.js
      ```

    * Add to the Jest Manual Mock file in src/__mocks__/movies.js
      ```
      const resMock = {
        token: 'mytoken'
      };

      export default function getMovies() {
        return new Promise((resolve, reject) => {
          process.nextTick(
            () =>
              resMock[token]
                ? resolve(resMock[token])
                : reject({
                    error: 'Error: token not found in mock response'
                  })
          );
        });
      }
      ```
      
    * Add to App.test.js
      ```
      // Jest Mock Function
      jest.mock('movies'); // src/__mocks__/movies.js

      // Assertion for a promise must be returned.
      it('works with promises on mock functions', () => {
        expect.assertions(1);
        return App.getMovies().then(data => expect(data.token).toEqual('mytoken'));
      });
      ```

    * Outcome:
      * Error not resolved, still get error `console.log src/api/movies.js:7 TypeError: res.json is not a function`
      * Additional error: `Expected one assertion to be called but only received zero assertion calls.`
  
  * Add Chai
    ```
    yarn add chai sinon --dev
    ```
    * Usage
      ```
      import { assert } from 'chai';
      import { spy } from 'sinon';
      ```
    * Reference: 
      * https://medium.com/kevin-salters-blog/testing-react-with-enzyme-fbfc30190e70
      * http://airbnb.io/enzyme/docs/api/ReactWrapper/find.html

  * Debugging tests: `console.log( wrapper.debug() )`

* Challenges
  * Fix the error by implementing the Jest Mock Function API - https://facebook.github.io/jest/docs/en/mock-function-api.html
  * Run tests with Coverage Reporting
    * Reference - https://github.com/ltfschoen/Movies-REM/blob/master/react-web/README.md#coverage-reporting

* Homework
  * Read about using Jest for shallow rendering and testing the output
  * Read about using Jest for full rendering, testing component lifecycle and state changes
  * Try experimenting with Jest Snapshots between your Git commits
  * Trying setting up Travis CI Configuration with your Jest tests
    * Reference - https://github.com/ltfschoen/Movies-REM/blob/master/react-web/README.md#on-ci-servers

