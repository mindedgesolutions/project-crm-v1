import { AdContentWrapper, AdSubmitBtn, CNewGroupPopover } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CAddEditUser = () => {
  document.title = `Add New User | ${import.meta.env.VITE_APP_TITLE}`;
  const { currentUser } = useSelector((store) => store.currentUser);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    group: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <AdContentWrapper>
      <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
        <h3 className="font-bold text-xl tracking-widest text-muted-foreground">
          Add new user
        </h3>
      </div>
      <div className="my-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between items-center gap-4 mb-2">
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="name"
              >
                name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Full name is required"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="email"
              >
                email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="A valid email is a must"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="mobile"
              >
                mobile <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="A valid mobile no. is a must"
                value={form.mobile}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-4 mt-4 mb-4">
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="price"
              >
                role <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-row justify-start items-center gap-4 py-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="2"
                    id={`admin`}
                    checked={form.role === "2"}
                    onChange={handleChange}
                  />
                  <Label
                    htmlFor={`admin`}
                    className="text-xs uppercase font-normal text-muted-foreground"
                  >
                    Admin
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="3"
                    id={`manager`}
                    checked={form.role === "3"}
                    onChange={handleChange}
                  />
                  <Label
                    htmlFor={`manager`}
                    className="text-xs uppercase font-normal text-muted-foreground"
                  >
                    Manager
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="4"
                    id={`user`}
                    checked={form.role === "4"}
                    onChange={handleChange}
                  />
                  <Label
                    htmlFor={`user`}
                    className="text-xs uppercase font-normal text-muted-foreground"
                  >
                    User
                  </Label>
                </div>
              </div>
            </div>
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="group"
              >
                <div className="flex flex-row justify-start items-center">
                  <span>group</span>
                  <CNewGroupPopover />
                </div>
              </Label>
              <select
                name="group"
                id="group"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                value={form.group}
                onChange={handleChange}
              >
                <option value="">- Select -</option>
              </select>
            </div>
            <div className="basis-1/3">&nbsp;</div>
          </div>
          <Separator />
          <div className="flex flex-row justify-start items-center my-8 gap-4">
            <AdSubmitBtn
              isLoading={isLoading}
              text={`add user`}
              addClass={`w-auto`}
            />
            <Link to={`/app/${currentUser.cslug}/users`}>
              <Button type="button" variant="outline" className="uppercase">
                Back to users
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </AdContentWrapper>
  );
};
export default CAddEditUser;
