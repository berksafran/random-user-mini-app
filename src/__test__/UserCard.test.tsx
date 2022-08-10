/* eslint-disable testing-library/no-debugging-utils */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UserCard from "../components/UserCard/UserCard";

const VISIBILITY_BUTTON = "visibility-button";
const FULLNAME = "fullname";
const COUNTRY = "country";
const AVATAR = "avatar";
const USER_CARD = "user-card";

test("renders all the elements correctly", async () => {
  render(<UserCard />);
  const button = screen.getByTestId(VISIBILITY_BUTTON);

  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Show");
});

test("when click the button, data should be fetched then user data should be appeared", async () => {
  render(<UserCard />);

  const button = screen.getByTestId(VISIBILITY_BUTTON);
  const fullName = screen.getByTestId(FULLNAME);
  const country = screen.getByTestId(COUNTRY);
  const avatar = screen.getByTestId(AVATAR);

  fireEvent.click(button);
  await waitFor(() => expect(fullName).not.toHaveAttribute("data-fullname", "-"));

  expect(fullName).toHaveTextContent("Ramses Pedroza");
  expect(fullName).toHaveAttribute("data-fullname", "Ramses-Pedroza");
  expect(country).toHaveTextContent("Mexico");
  expect(avatar).toHaveAttribute("src", "https://randomuser.me/api/portraits/med/men/68.jpg");
});

test("when click the 'show' button, data should be fetched then click again the 'hide' button", async () => {
  render(<UserCard />);

  const button = screen.getByTestId(VISIBILITY_BUTTON);
  const fullName = screen.getByTestId(FULLNAME);
  const userCard = screen.getByTestId(USER_CARD);

  fireEvent.click(button);
  await waitFor(() => expect(fullName).not.toHaveAttribute("data-fullname", "-"));
  
  expect(fullName).toHaveTextContent("Ramses Pedroza");
  
  fireEvent.click(button);
  await waitFor(() => expect(fullName).toHaveAttribute("data-fullname", "-"));
  
  expect(userCard).toHaveClass("opacity-0");
  expect(button).toHaveTextContent("Show");
  expect(fullName).toHaveAttribute("data-fullname", "-");
});

test("click the 'show' button, data should be fetched then click again the 'hide' button, then click again the 'show' button", async () => {
  render(<UserCard />);

  const button = screen.getByTestId(VISIBILITY_BUTTON);
  const fullName = screen.getByTestId(FULLNAME);
  const userCard = screen.getByTestId(USER_CARD);

  fireEvent.click(button); // for showing the data
  await waitFor(() => expect(fullName).not.toHaveAttribute("data-fullname", "-"));
  
  expect(fullName).toHaveTextContent("Ramses Pedroza");
  
  fireEvent.click(button); // for hiding the data
  await waitFor(() => expect(fullName).toHaveAttribute("data-fullname", "-"));
  
  expect(userCard).toHaveClass("opacity-0");
  expect(button).toHaveTextContent("Show");
  expect(fullName).toHaveAttribute("data-fullname", "-");
  
  fireEvent.click(button); // for showing the data
  await waitFor(() => expect(fullName).not.toHaveAttribute("data-fullname", "-"));
  
  expect(fullName).toHaveTextContent("Ramses Pedroza");

});
