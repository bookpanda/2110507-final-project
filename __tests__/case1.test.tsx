import { createDentist } from "@/app/api/dentist";
import NewDentistPage from "@/app/dentists/new/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/app/api/dentist", () => ({
  createDentist: jest.fn(),
}));

describe("NewDentistPage", () => {
  let mockSession;

  beforeEach(() => {
    mockSession = {
      data: { user: { token: "mock-token" } },
      status: "authenticated",
    };
    (useSession as jest.Mock).mockReturnValue(mockSession);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form and submits correctly", async () => {
    const mockCreateDentist = createDentist as jest.MockedFunction<
      typeof createDentist
    >;
    mockCreateDentist.mockResolvedValue({
      _id: "1",
      name: "Dr. John Doe",
      hospital: "Super Hospital",
      address: "1234 Some Street",
      expertist: "Oral Surgeon",
      tel: "123-456-7890",
      picture: "https://example",
    });

    render(<NewDentistPage />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hospital/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expertise/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telephone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/picture url/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();

    const fieldName = screen.getByTestId("name").querySelector("input");
    expect(fieldName).toBeInTheDocument();
    fireEvent.change(fieldName as Element, {
      target: { value: "Dr. John Doe" },
    });

    const fieldHospital = screen.getByTestId("hospital").querySelector("input");
    expect(fieldHospital).toBeInTheDocument();
    fireEvent.change(fieldHospital as Element, {
      target: { value: "Super Hospital" },
    });

    const fieldAddress = screen.getByTestId("address").querySelector("input");
    expect(fieldAddress).toBeInTheDocument();
    fireEvent.change(fieldAddress as Element, {
      target: { value: "1234 Some Street" },
    });

    const fieldExpertise = screen
      .getByTestId("expertise")
      .querySelector("input");
    expect(fieldExpertise).toBeInTheDocument();
    fireEvent.change(fieldExpertise as Element, {
      target: { value: "Oral Surgeon" },
    });

    const fieldTelephone = screen.getByTestId("tel").querySelector("input");
    expect(fieldTelephone).toBeInTheDocument();
    fireEvent.change(fieldTelephone as Element, {
      target: { value: "123-456-7890" },
    });

    const fieldPicture = screen.getByTestId("picture").querySelector("input");
    expect(fieldPicture).toBeInTheDocument();
    fireEvent.change(fieldPicture as Element, {
      target: { value: "https://example.com/pic.jpg" },
    });

    expect(screen.getByLabelText(/name/i)).toHaveValue("Dr. John Doe");
    expect(screen.getByLabelText(/address/i)).toHaveValue("1234 Some Street");
    expect(screen.getByLabelText(/hospital/i)).toHaveValue("Super Hospital");
    expect(screen.getByLabelText(/expertise/i)).toHaveValue("Oral Surgeon");
    expect(screen.getByLabelText(/telephone/i)).toHaveValue("123-456-7890");
    expect(screen.getByLabelText(/picture url/i)).toHaveValue(
      "https://example.com/pic.jpg"
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);

    // Wait for the API call to complete
    expect(createDentist).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(createDentist).toHaveBeenCalledTimes(1));
    expect(createDentist).toHaveBeenCalledWith(
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
  });

  test("shows an error message when API call fails", async () => {
    (createDentist as jest.Mock).mockRejectedValue(
      new Error("Failed to create dentist")
    );

    render(<NewDentistPage />);

    const fieldName = screen.getByTestId("name").querySelector("input");
    expect(fieldName).toBeInTheDocument();
    fireEvent.change(fieldName as Element, {
      target: { value: "Dr. John Doe" },
    });

    const fieldHospital = screen.getByTestId("hospital").querySelector("input");
    expect(fieldHospital).toBeInTheDocument();
    fireEvent.change(fieldHospital as Element, {
      target: { value: "Super Hospital" },
    });

    const fieldAddress = screen.getByTestId("address").querySelector("input");
    expect(fieldAddress).toBeInTheDocument();
    fireEvent.change(fieldAddress as Element, {
      target: { value: "1234 Some Street" },
    });

    const fieldExpertise = screen
      .getByTestId("expertise")
      .querySelector("input");
    expect(fieldExpertise).toBeInTheDocument();
    fireEvent.change(fieldExpertise as Element, {
      target: { value: "Oral Surgeon" },
    });

    const fieldTelephone = screen.getByTestId("tel").querySelector("input");
    expect(fieldTelephone).toBeInTheDocument();
    fireEvent.change(fieldTelephone as Element, {
      target: { value: "123-456-7890" },
    });

    const fieldPicture = screen.getByTestId("picture").querySelector("input");
    expect(fieldPicture).toBeInTheDocument();
    fireEvent.change(fieldPicture as Element, {
      target: { value: "https://example.com/pic.jpg" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(screen.getByText(/failed to create dentist/i)).toBeInTheDocument()
    );
  });
});
