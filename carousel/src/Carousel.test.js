import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// Smoke test
test("renders Carousel component without crashing", () => {
  render(<Carousel />);
});

// Snapshot test
test("matches Carousel snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

// Left Arrow Bug
test("left arrow moves to previous image", () => {
  const { getByTestId } = render(<Carousel />);

  // Assume that the second image is currently active
  fireEvent.click(getByTestId("right-arrow")); // Move to the second image
  fireEvent.click(getByTestId("left-arrow")); // Now test moving back to the first image

  // Check if the first image is displayed after clicking the left arrow
  expect(getByTestId("image-0")).toBeInTheDocument();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});
