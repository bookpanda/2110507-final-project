import { Suspense } from "react";
import { DentistsGrid, DentistsGridSuspense } from "./DentistsGrid";

export default async function DentistsPage() {
  return (
    <main className="mt-[10vh] px-[10vw]">
      <h1 className="mb-12 text-5xl font-bold">Dental Team and Staffs</h1>
      <Suspense fallback={<DentistsGridSuspense />}>
        <DentistsGrid />
      </Suspense>
    </main>
  );
}
