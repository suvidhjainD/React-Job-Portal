import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Heart, MapIcon, MapPin, Trash2Icon } from "lucide-react";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { saveJob } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";

const JobCard = ({
  job,
  isMyjob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const {
    fn: fnSavedJob,
    data: Savedjob,
    loading: loadingSavedJob,
  } = useFetch(saveJob);
  const { user } = useUser();

  return (
    <Card className="py-2">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyjob && (
            <Trash2Icon fill="red" size={18} className=" cursor-pointer" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div>
          {job.company && <img src={job.company.logo_url} className="w-20" />}
          <MapPin size={15} /> {job.location}
        </div>
        <hr />
        {job.description}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        <Heart size={20} stroke="red" fill="red" className="cursor-pointer" />
      </CardFooter>
    </Card>
  );
};

export default JobCard;
