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

const ApplyJobDrawer = ({ user, job, applied = false, fetchJob }) => {
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

          <form className="flex flex-col gap-4 p-4">
            <Input
              type="number"
              placeholder="Years of Experience"
              className="flex-1"
            />
            <Input type="text" placeholder="Skills" className="flex-1" />
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Fresher" id="fresher" />
                <Label htmlFor="fresher">Fresher</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Experienced" id="experienced" />
                <Label htmlFor="experienced">Experienced</Label>
              </div>
            </RadioGroup>

            <Input type="file" accept=".pdf, .doc, .docx" />
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
