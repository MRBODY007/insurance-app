
import { render, screen } from '@testing-library/react';
import App from './App'; //  ตรวจสอบ path ของ App component

// Mocking InsuranceForm component
jest.mock('../../components/InsuranceForm', () => () => (
  <div>Insurance Form Mock</div>
));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    // ตรวจสอบว่า element ต่างๆ ถูก render
    expect(screen.getByText(/FWD Insurance/)).toBeInTheDocument();
    expect(screen.getByText(/Insurance Form Mock/)).toBeInTheDocument(); // ตรวจสอบว่า InsuranceForm ถูก mock และแสดง
  });
});
