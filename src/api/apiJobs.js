import supabaseClient from "@/utils/supabase";
// location, company_id, searchQuery
export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url), saved: saved_jobs(id)");
  //   eq is a supabase query

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }
  const { data, error } = await query;
  if (error) {
    console.error("Error fetching data", error);
    return null;
  }
  return data;
}

export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.error("Error deleting saved job", deleteError);
      return null;
    }
    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error inserting data", insertError);
      return null;
    }
    return data;
  }
}

export async function getSingleJobs(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),applications: applications(*)")
    .eq("id", job_id)
    .single(); // single gives res in array as we need 1 job details

  if (error) {
    console.error("Error fetching Job", error);
    return null;
  }
  return data;
}

export async function updateHiringStatus(token, { job_id }, isOpen) {
  console.log(isOpen);
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error updating job ", error);
    return null;
  }
  return data;
}
