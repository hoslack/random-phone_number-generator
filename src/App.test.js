import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
// test('Test App exists', ()=> {
//   const app = shallow(<App/>);
// });
// test('null', () => {
//   const n = null;
//   expect(n).toBeNull();
//   expect(n).toBeDefined();
//   expect(n).not.toBeUndefined();
//   expect(n).not.toBeTruthy();
//   expect(n).toBeFalsy();
// });
test('App exists', () => {
  const app = renderer.create(
    <App/>,
  );
  expect(app).toBeDefined();
  expect(app).toMatchSnapshot();
});
