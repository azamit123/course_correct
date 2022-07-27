import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import Lesson from "../src/components/Lesson"

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

const lesson = {
  id: "62e0a62ff47b060811868ea5", tutor_id: "62e0a564f47b060811868e9d", tutorName: "Azamit",
  tutorEmail: "azi@dispostable.com", tutorPic: "users_teacher.jpg", subjectName: "Guitar", fee: 50,
  type: "inPerson", day: ["monday", "tuesday"], startTime: "10:00", endTime: "11:00", description: "love music",
  pic: "Subjects_guitar.jpg", isAvailable: true
}


test("should render available Lesson Component ", () => {
  render(<Lesson subject={lesson} />);
  const lessonElement = screen.getByTestId("1");
  expect(lessonElement).toBeInTheDocument();
})




const lesson2 = {
  id: "62e18f45941d0e4512e7d561", tutor_id: "62e0a564f47b060811868e9d", tutorName: "Azamit",
  tutorEmail: "azi@dispostable.com", tutorPic: "users_teacher.jpg", subjectName: "Guitar", fee: 50,
  type: "inPerson", day: ["monday", "tuesday"], startTime: "10:00", endTime: "11:00", description: "love music",
  pic: "Subjects_guitar.jpg", isAvailable: false
}

test("should render un-available Lesson Component ", () => {
  render(<Lesson subject={lesson2} />);
  const lessonElement = screen.getByTestId("1");
  expect(lessonElement).toBeInTheDocument();
})