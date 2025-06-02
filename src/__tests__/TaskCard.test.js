import { render, screen } from "@testing-library/react";
import TaskCard from "../components/TaskCard";

test("renders task title", () => {
  const task = {
    title: "Sample Task",
    status: "todo",
  };

  render(<TaskCard task={task} />);
  expect(screen.getByText(/Sample Task/i)).toBeInTheDocument();
});
