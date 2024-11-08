import { findAllDentist } from "@/api/dentist";
import { addDentists, selectDentists } from "@/store/dentistSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";

export const useFindAllDentist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useAppDispatch();
  const dentists = useAppSelector(selectDentists);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const res = await findAllDentist();
      if (!res) {
        return setError(new Error("Failed to fetch dentists"));
      }

      res.data.sort((a, b) => a.name.localeCompare(b.name));

      dispatch(addDentists(res.data));
    })();

    setLoading(false);
  }, []);

  return { dentists, loading, error };
};
