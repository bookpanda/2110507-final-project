import { findAllDentist } from "@/app/api/dentist";
import DentistsPage from "@/app/dentists/page";
import { render, screen, waitFor } from "@testing-library/react";
import { getServerSession } from "next-auth";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/app/api/dentist", () => ({
  findAllDentist: jest.fn(),
}));

describe("DentistsGrid", () => {
  it("renders the list of dentists correctly for admin", async () => {
    // Mock the session to be an admin
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { role: "admin" },
    });

    (findAllDentist as jest.Mock).mockResolvedValue({
      data: [
        {
          _id: "1",
          name: "Dr. John Doe",
          hospital: "Hospital 1",
          address: "123 Main St",
          expertist: "Oral Surgeon",
          tel: "123-456-7890",
          picture: "https://example.com/picture.jpg",
        },
        {
          _id: "2",
          name: "Dr. Jane Smith",
          hospital: "Hospital 2",
          address: "456 Elm St",
          expertist: "Dentist",
          tel: "123-456-7890",
          picture: "https://example.com/picture2.jpg",
        },
      ],
    });

    render(<DentistsPage />);
    // render(
    //   <Suspense fallback={<DentistsGridSuspense />}>
    //     <DentistsGrid />
    //   </Suspense>
    // );

    await waitFor(() => screen.getByText("Dr. John Doe"));
    await waitFor(() => screen.getByText("Dr. Jane Smith"));

    // Assert that dentist names and roles are rendered
    expect(screen.getByText("Dr. John Doe")).toBeInTheDocument();
    expect(screen.getByText("Oral Surgeon")).toBeInTheDocument();
    expect(screen.getByText("Dr. Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Dentist")).toBeInTheDocument();

    // Assert that the "See Profile" and "Edit" buttons are displayed for an admin user
    expect(screen.getByText("See Profile")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  //   it("renders the list of dentists correctly for a non-admin user", async () => {
  //     // Mock the session to be a non-admin user
  //     (getServerSession as jest.Mock).mockResolvedValue({
  //       user: { role: "user" },
  //     });

  //     // Mock the findAllDentist response
  //     (findAllDentist as jest.Mock).mockResolvedValue({
  //       data: [
  //         {
  //           _id: "1",
  //           name: "Dr. John Doe",
  //           expertist: "Oral Surgeon",
  //           picture: "https://example.com/picture.jpg",
  //         },
  //       ],
  //     });

  //     // Render the DentistsGrid component
  //     render(<DentistsGrid />);

  //     // Wait for dentists to be rendered
  //     await waitFor(() => screen.getByText("Dr. John Doe"));

  //     // Assert that dentist name and role are rendered
  //     expect(screen.getByText("Dr. John Doe")).toBeInTheDocument();
  //     expect(screen.getByText("Oral Surgeon")).toBeInTheDocument();

  //     // Assert that the "See Profile" button is displayed, but "Edit" is not visible for a non-admin
  //     expect(screen.getByText("See Profile")).toBeInTheDocument();
  //     expect(screen.queryByText("Edit")).toBeNull();
  //   });

  //   it("displays an error message if fetching dentists fails", async () => {
  //     // Mock the session to be an admin
  //     (getServerSession as jest.Mock).mockResolvedValue({
  //       user: { role: "admin" },
  //     });

  //     // Mock the findAllDentist to throw an error
  //     (findAllDentist as jest.Mock).mockRejectedValue(
  //       new Error("Failed to fetch dentists")
  //     );

  //     // Render the DentistsGrid component
  //     render(<DentistsGrid />);

  //     // Wait for the error message to be rendered
  //     await waitFor(() => screen.getByText("Failed to fetch dentists"));

  //     // Assert that the error message is shown
  //     expect(screen.getByText("Failed to fetch dentists")).toBeInTheDocument();
  //   });
});
