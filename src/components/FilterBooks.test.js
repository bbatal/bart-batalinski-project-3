import { render, screen } from "@testing-library/react";
import FilterBooks from "./FilterBooks"

test('FilterBooks component should render', () => {
    render(<FilterBooks />)

    screen.debug();
})