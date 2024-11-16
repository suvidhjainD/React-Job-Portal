import { z } from "zod";
import { Button } from "./button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { Input } from "./input";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyToJob } from "@/api/apiApplications";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

//using zod (z) for validation of the form

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        (file[0] && file[0].type === "application/pdf") ||
        file[0].type === "application/msword",
      { message: "Only PDF and Word are allowed" }
    ),
});

const ApplyJobDrawer = ({ user, job, applied = false, fetchJob }) => {
  //connecting hook forms to zod schema we wrote and we
  // add it to every component of forms where we need input
  // console.log(job?.applications?.find((a) => a.candidate_id === user.id));
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    fn: fnApply,
    error: errorApply,
    loading: loadingApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    console.log(data);
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };
  return (
    <div>
      <Drawer open={applied ? false : undefined}>
        <DrawerTrigger>
          <Button
            size="xl"
            variant={job?.isOpen && !applied ? "blue" : "destructive"}
            disabled={!job?.isOpen || applied}
          >
            {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              Apply for {job?.title} at {job?.company?.name}
            </DrawerTitle>
            <DrawerDescription>Fill the form below.</DrawerDescription>
          </DrawerHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-4"
          >
            <Input
              type="number"
              placeholder="Years of Experience"
              className="flex-1"
              {...register("experience", { valueAsNumber: true })}
            />
            {errors.experience && (
              <p className="text-red-600">{errors.experience.message}</p>
            )}
            <Input
              type="text"
              placeholder="Skills"
              className="flex-1"
              {...register("skills")}
            />
            {errors.skills && (
              <p className="text-red-600">{errors.skills.message}</p>
            )}

            {/* for radio group hook forms wont work cuz its 3rd party library ShadcnUi we need to use controller ///// control in controller provides access to form*/}
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} {...field}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Graduate" id="graduate" />
                    <Label htmlFor="graduate">Graduate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Post Graduate" id="post-graduate" />
                    <Label htmlFor="post-graduate">Post-Graduate</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.education && (
              <p className="text-red-600">{errors.education.message}</p>
            )}

            <Input
              type="file"
              accept=".pdf, .doc, .docx"
              {...register("resume")}
            />
            {errors.resume && (
              <p className="text-red-600">{errors.resume.message}</p>
            )}
            {errorApply?.message && (
              <p className="text-red-600">{errorApply?.message}</p>
            )}
            {loadingApply && <BarLoader width={"100%"} color="blue" />}
            <Button variant={"blue"}>Apply</Button>
          </form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ApplyJobDrawer;
