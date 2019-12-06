import React from 'react';
import renderer from 'react-test-renderer';
import CardRecord from '../src/CardRecord';
import {shallow} from 'enzyme';
// import {expect} from 'chai';
import {mount} from 'enzyme';
import TestRunner from 'jest-runner';

describe("Button component", () => {
    it('should update the count by 1 when invoked by default', () => {
        const wrapper = shallow(<CardRecord />);
        const instance = wrapper.instance();
        let ans = instance.playSong();
        expect(ans).toBe(false);
      });
});