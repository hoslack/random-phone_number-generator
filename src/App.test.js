import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';
import { mount } from 'enzyme';
import './setUpTests'

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App/>);
  });

  afterEach(() => {
    localStorage.removeItem('numbers');
    wrapper.unmount()
  });

  it('App Renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('App exists', () => {
    const app = renderer.create(
      <App/>,
    );
    expect(app).toBeDefined();
  });

  it('Generates Random Numbers', () => {
    wrapper.find('.number-input').simulate('change', {
      target: { value: 20 }
    });
    expect(wrapper.state().quantity).toEqual(20);
    wrapper.find('.generate-btn').first().simulate('click');
    expect(JSON.parse(localStorage.getItem('numbers')).toBeTruthy);
    expect(wrapper.find('.number-list-div .number')).toHaveLength(20)
  });

  it('Generates Random 200 when the given value is too high', () => {
    wrapper.find('.number-input').simulate('change', {
      target: { value: 20000 }
    });
    wrapper.find('.generate-btn').first().simulate('click');
    expect(wrapper.find('.number-list-div .number')).toHaveLength(200)
  });

  it('Generates Random 200 with no value given', () => {
    wrapper.find('.number-input').simulate('change', {
      target: { value: '' }
    });
    wrapper.find('.generate-btn').first().simulate('click');
    expect(wrapper.find('.number-list-div .number')).toHaveLength(200)
  });

  it('Fetches from local storage', () => {
    localStorage.removeItem('numbers');
    localStorage.setItem('numbers', JSON.stringify(['0712277127', '0712277127']));
    wrapper.find('.number-input').simulate('change', {
      target: { value: 20 }
    });
    wrapper.find('.generate-btn').first().simulate('click');
    expect(wrapper.find('.number-list-div .number')).toHaveLength(2)
  });

  it('Updates state on local storage availability', () => {
    localStorage.removeItem('numbers');
    localStorage.setItem('numbers', JSON.stringify(['0712277127', '0712277127']));
    wrapper.find('.generate-btn').first().simulate('click');
    expect(wrapper.state().toasterText).toEqual('Numbers fetched from Storage');
    expect(wrapper.state().displayToaster).toEqual('block');
  });

  it('Deletes stored numbers', () => {
    wrapper.find('.number-input').simulate('change', {
      target: { value: 20 }
    });
    wrapper.find('.generate-btn').first().simulate('click');
    wrapper.find('.delete-btn').first().simulate('click');
    expect(wrapper.state().numbers).toEqual([]);
  });

  it('Sorts numbers stored', () => {
    wrapper.find('.number-input').simulate('change', {
      target: { value: 20 }
    });
    wrapper.find('.generate-btn').first().simulate('click');
    let sorted = wrapper.state().numbers.sort((a,b)=>a-b);
    wrapper.find('.sort-btn').first().simulate('click');
    expect(wrapper.state().numbers).toEqual(sorted);
  });
});
