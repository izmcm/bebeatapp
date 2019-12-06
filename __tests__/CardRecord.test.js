import React from 'react';
import CardRecord from '../src/CardRecord';
import {shallow} from 'enzyme';

describe("Test mojelo's song", () => {
    it('Deve retornar false', () => {
        const wrapper = shallow(<CardRecord />);
        const instance = wrapper.instance();
        let ans = instance.playSong("cilada");
        expect(ans).toBe(false);
      });
});