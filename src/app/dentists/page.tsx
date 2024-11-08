// "use client";

import { Suspense } from "react";
import { DentistsGrid } from "./DentistsGrid";

export default async function DentistsPage() {
  // const { dentists } = useFindAllDentist();

  return (
    <main className="mt-[10vh] px-[10vw]">
      <h1 className="text-5xl font-bold">Dental Team and Staffs</h1>
      <Suspense fallback={<p>a</p>}>
        <DentistsGrid />
      </Suspense>
    </main>
  );
}
