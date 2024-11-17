import { getSingleJobs, updateHiringStatus } from "@/api/apiJobs";
import ApplicationCard from "@/components/ui/ApplicationCard";
import ApplyJobDrawer from "@/components/ui/apply-job";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams(); //to get the id from search bar

  const {
    fn: fbSingleJob,
    data: Singlejob,
    loading: loadingSingleJob,
  } = useFetch(getSingleJobs, { job_id: id });

  const {
    fn: fnHiringStatus,

    loading: loadingHiringStatus,
  } = useFetch(updateHiringStatus, { job_id: id });

  const handelStatusChange = (value) => {
    const isOpen = value === "open";

    fnHiringStatus(isOpen).then(() => fbSingleJob());
  };

  useEffect(() => {
    if (isLoaded) {
      fbSingleJob();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingSingleJob) {
    return <BarLoader className="mb-4" width={"100%"} color="blue" />;
  }

  // console.log(
  //   "a" + Singlejob?.applications?.find((a) => a.candidate_id === user.id)
  // );

  return (
    <div>
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="font-extrabold pb-3 text-4xl sm:text-6xl">
          {Singlejob?.title}
        </h1>
        <img src={Singlejob?.company?.logo_url} className="h-12" />
      </div>

      <div className="flex justify-between pb-6">
        <div className="flex gap-2">
          <MapPinIcon />
          {Singlejob?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase /> {Singlejob?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {Singlejob?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorOpen /> Closed
            </>
          )}
        </div>
      </div>
      {/*Hiring status */}
      {/* {console.log(user?.id, Singlejob?.recruiter_id)} */}

      {Singlejob?.recruiter_id === user?.id && (
        <Select onValueChange={handelStatusChange}>
          <SelectTrigger
            className={Singlejob?.isOpen ? "bg-green-950" : "bg-red-950"}
          >
            <SelectValue
              placeholder={
                "Hiring Status" + (Singlejob?.isOpen ? "(Open)" : "(Closed)")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <div>
        <h2 className=" text-2xl font-bold sm:text-3xl pb-5 pt-5 ">
          About the job
        </h2>
        <p className="sm:text-lg">{Singlejob?.description}</p>
        <h2 className=" text-2xl font-bold sm:text-3xl pb-5 pt-5  ">
          Requirements
        </h2>
        <p>{Singlejob?.requirements} </p>
        {/*add a list for requirement for UI can us MD ediot already installed*/}
        {/* render application */}
      </div>
      <div className="flex justify-center  pt-40">
        {Singlejob?.recruiter_id !== user?.id && (
          <ApplyJobDrawer
            job={Singlejob}
            user={user}
            fetchJob={fbSingleJob}
            applied={Singlejob?.applications?.find(
              (ap) => ap.candidate_id === user.id
            )}
          />
        )}
      </div>
      {Singlejob?.applications?.length > 0 &&
        Singlejob?.recruiter_id === user?.id && (
          <div className="flex flex-col gap-2">
            <h2 className=" text-2xl font-bold sm:text-3xl pb-5 pt-5 ">
              Applications
            </h2>
            {Singlejob?.applications.map((application) => {
              return (
                <ApplicationCard
                  key={application?.id}
                  application={application}
                />
              );
            })}
          </div>
        )}
    </div>
  );
};

export default JobPage;
