import React from 'react';
import {shallow} from 'enzyme';
import Clear from "./Clear";


describe('Clear', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Clear debug />);
        expect(component).toMatchSnapshot();
    });

    it('should render correctly with no props', () => {
        const component = shallow(<Clear/>);
        expect(component).toMatchSnapshot();
    });

    it('should render banner text correctly with given strings', () => {
        const string = 'clear';
        const component = shallow(<Clear text={string} />);
        expect(component).toMatchSnapshot();
    });

});