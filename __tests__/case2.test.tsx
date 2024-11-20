import {
  deleteDentist,
  findDentistByID,
  updateDentist,
} from "@/app/api/dentist";
import EditDentistPage from "@/app/dentist/[id]/edit/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/app/api/dentist", () => ({
  updateDentist: jest.fn(),
  deleteDentist: jest.fn(),
  findDentistByID: jest.fn(),
}));

describe("EditDentistPage", () => {
  let mockSession;
  let mockRouter;

  beforeEach(() => {
    mockSession = {
      data: { user: { token: "mock-token" } },
      status: "authenticated",
    };
    mockRouter = { push: jest.fn() };

    (useSession as jest.Mock).mockReturnValue(mockSession);
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should update dentist details", async () => {
    (findDentistByID as jest.Mock).mockResolvedValue({
      data: {
        name: "Dr. John Doe",
        hospital: "Super Hospital",
        address: "1234 Some Street",
        expertist: "Oral Surgeon",
        tel: "123-456-7890",
        picture: "https://example.com/pic.jpg",
      },
    });

    (updateDentist as jest.Mock).mockResolvedValue({ data: { success: true } });

    render(<EditDentistPage params={{ id: "1" }} />);

    const fieldName = screen.getByTestId("name").querySelector("input");
    expect(fieldName).toBeInTheDocument();
    fireEvent.change(fieldName as Element, {
      target: { value: "Dr. Jane Smith" },
    });

    const fieldHospital = screen.getByTestId("hospital").querySelector("input");
    expect(fieldHospital).toBeInTheDocument();
    fireEvent.change(fieldHospital as Element, {
      target: { value: "Awesome Hospital" },
    });

    const fieldAddress = screen.getByTestId("address").querySelector("input");
    expect(fieldAddress).toBeInTheDocument();
    fireEvent.change(fieldAddress as Element, {
      target: { value: "5678 New Street" },
    });

    const fieldExpertise = screen
      .getByTestId("expertise")
      .querySelector("input");
    expect(fieldExpertise).toBeInTheDocument();
    fireEvent.change(fieldExpertise as Element, {
      target: { value: "Orthodontist" },
    });

    const fieldTelephone = screen.getByTestId("tel").querySelector("input");
    expect(fieldTelephone).toBeInTheDocument();
    fireEvent.change(fieldTelephone as Element, {
      target: { value: "987-654-3210" },
    });

    const fieldPicture = screen.getByTestId("picture").querySelector("input");
    expect(fieldPicture).toBeInTheDocument();
    fireEvent.change(fieldPicture as Element, {
      target: { value: "https://newpic.com/pic.jpg" },
    });

    const submitButton = screen.getByRole("button", {
      name: /update dentist/i,
    });
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);

    await waitFor(() => expect(updateDentist).toHaveBeenCalledTimes(1));
    expect(updateDentist).toHaveBeenCalledWith(
      "1",
      {
        name: "Dr. John Doe",
        hospital: "Super Hospital",
        address: "1234 Some Street",
        expertist: "Oral Surgeon",
        tel: "123-456-7890",
        picture: "https://example.com/pic.jpg",
      },
      "mock-token"
    );

    expect(mockRouter.push).toHaveBeenCalledWith("/dentists");
  });

  test("should delete dentist", async () => {
    render(<EditDentistPage params={{ id: "1" }} />);

    const deleteButton = screen.getByRole("button", {
      name: /delete dentist/i,
    });
    expect(deleteButton).toBeInTheDocument();
    await userEvent.click(deleteButton);

    expect(
      screen.getByText(/are you sure you want to delete/i)
    ).toBeInTheDocument();

    const confirmDeleteButton = screen.getByRole("button", { name: /delete/i });
    userEvent.click(confirmDeleteButton);

    await waitFor(() => {
      expect(deleteDentist).toHaveBeenCalledWith("1", "mock-token");
    });

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/dentists");
    });
  });
});
