## README

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

    * Create `src/setupTests.js` as it will automatically run before running tests
    
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

  * Configure Enzyme to use the Adapter
    ```
    import Enzyme from 'enzyme';
    import Adapter from 'enzyme-adapter-react-16';

    Enzyme.configure({ adapter: new Adapter() });
    ```

* Basic Jest "smoke test"

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

  * Error using Jest version of App.test.js:
    ```
    console.log src/api/movies.js:7
      TypeError: Network request failed
      ...
    ```
  
* Challenge
  * Fix the error by implementing the Jest Mock Function API - https://facebook.github.io/jest/docs/en/mock-function-api.html
  * Run tests with Coverage Reporting
    * Reference - https://github.com/ltfschoen/Movies-REM/blob/master/react-web/README.md#coverage-reporting
  * Jest for shallow rendering and testing the output
  * Jest for full rendering, testing component lifecycle and state changes
  * Setup Travis CI Configuration 
    * Reference - https://github.com/ltfschoen/Movies-REM/blob/master/react-web/README.md#on-ci-servers
