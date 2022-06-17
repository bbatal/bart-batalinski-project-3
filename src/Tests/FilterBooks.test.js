import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import FilterBooks from "../components/FilterBooks";


afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement('div');

    ReactDOM.render(<FilterBooks />, div);
})

it("renders button correctly", () => {
    render(<FilterBooks />);
    expect(screen.getByTestId('filter-button')).toHaveTextContent("Highest Rating")
})

it("matches snapshot", () => {
    const tree = renderer.create(<FilterBooks />).toJSON();
    expect(tree).toMatchSnapshot();
})



