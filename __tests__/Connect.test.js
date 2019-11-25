import {shallow} from 'enzyme';
import React from 'react';
import App from '../src/Connect';

describe('App', () => {
    describe('#Text', () => {
        it('should render the word "Length" in testId rectangleLengthText', () => {
            const app = shallow(<App/>);
            const text = app.find("[testID='rectangleLengthText']").dive().text();
            expect(text).toEqual('Length');
        });
    });
});