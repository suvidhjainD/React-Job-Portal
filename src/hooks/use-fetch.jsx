import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, SetError] = useState(null);
  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    SetError(null);

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const response = await cb(supabaseAccessToken, options, args);
      setData(response);
      SetError(null);
    } catch (error) {
      SetError(error);
    } finally {
      setLoading(false);
    }
  };

  return { fn, data, loading, error };
};
export default useFetch;
