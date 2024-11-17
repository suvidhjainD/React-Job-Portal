import { Download, School } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";

const ApplicationCard = ({ application, isCandidate = false }) => {
  // iscandidate is used for tracking application status
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };
  console.log(application);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download
            size={18}
            className="bg-blue-100 text-black rounded-xl h-8 w-12 p-1.5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 ">
            Experience: {application?.experience} years
          </div>
          <div className="flex gap-2 ">
            <School /> {application?.education}{" "}
          </div>
          <div className="flex gap-2 ">Skills : {application?.skills} </div>
        </div>
        <hr />
      </CardContent>
      <CardFooter>
        <span>{new Date(application?.created_at).toLocaleString()}</span>
      </CardFooter>
      {/* Tracking where the application is is not completed */}
    </Card>
  );
};

export default ApplicationCard;
