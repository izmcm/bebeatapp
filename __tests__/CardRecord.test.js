import React from 'react';
import CardRecord from '../src/CardRecord';
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme';

// describe("Test molejo's song", () => {
//     it('Deve retornar false', () => {
//         const wrapper = shallow(<CardRecord />);
//         const instance = wrapper.instance();
//         let ans = instance.playSong();
//         expect(ans).toBe(false);
//       });
// });

test('renders correctly', () => {
  const wrapper = shallow(<CardRecord/>).toJSON();
  expect(wrapper).toMatchSnapshot();
});
