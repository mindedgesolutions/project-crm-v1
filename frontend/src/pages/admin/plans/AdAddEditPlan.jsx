import { AdContentWrapper, AdSubmitBtn } from "@/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import customFetch from "@/utils/customFetch";
import { tenures } from "@/utils/data";
import { splitErrors } from "@/utils/splitErrors";
import { nanoid } from "nanoid";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import showSuccess from "@/utils/showSuccess";

const AdAddEditPlan = () => {
  document.title = `Add New Plan | ${import.meta.env.VITE_APP_TITLE}`;
  const { attributes } = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    shortDesc: "",
    tenure: "",
    price: "",
  });
  const [formState, setFormState] = useState({});

  useEffect(() => {
    const initialState = {};
    attributes.forEach((field) => {
      initialState[field.name] = field.type === "radio" ? "" : "";
    });
    setFormState(initialState);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDbChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post(`/admin/plans`, data);
      setIsLoading(false);
      showSuccess(`Plan added`);
      navigate(`/admin/masters/plans`);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
    }
  };

  return (
    <AdContentWrapper>
      <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
        <h3 className="font-bold text-xl tracking-widest text-muted-foreground">
          Add New Plan
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
                placeholder="A fitting plan name is a must"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="shortDesc"
              >
                short description <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="shortDesc"
                id="shortDesc"
                placeholder="A punch line will make the plan more attractive"
                value={form.shortDesc}
                onChange={handleChange}
              />
            </div>
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="tenure"
              >
                tenure <span className="text-red-500">*</span>
              </Label>
              <select
                name="tenure"
                id="tenure"
                className="flex h-10 min-w-48 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                value={form.tenure}
                onChange={handleChange}
              >
                <option value="">- Select -</option>
                {tenures.map((tenure) => {
                  return (
                    <option key={nanoid()} value={tenure.value}>
                      {tenure.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-4 mb-4">
            <div className="basis-1/3 flex flex-col space-y-2">
              <Label
                className="text-muted-foreground text-xs uppercase"
                htmlFor="price"
              >
                price <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="A punch line will make the plan more attractive"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <div className="basis-1/3">&nbsp;</div>
            <div className="basis-1/3">&nbsp;</div>
          </div>
          <Separator />
          <div className="flex flex-col mb-4">
            <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
              <h3 className="font-semibold tracking-widest text-muted-foreground">
                Plan Attributes
              </h3>
            </div>
            {attributes.map((attribute, index) => {
              return (
                <div key={nanoid()}>
                  <div className="flex flex-row justify-start items-center text-muted-foreground gap-4 py-1">
                    <span className="w-[50px] text-xs">{index + 1}.</span>
                    <p className="min-w-96 text-xs uppercase tracking-wider">
                      {attribute.attribute}
                    </p>
                    <span>
                      {attribute.type === "radio" ? (
                        <>
                          <div className="flex flex-row justify-start items-center gap-4 py-3">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={attribute.name}
                                value="yes"
                                id={`${attribute.name}_yes`}
                                checked={formState[attribute.name] === "yes"}
                                onChange={handleDbChange}
                              />
                              <Label
                                htmlFor={`${attribute.name}_yes`}
                                className="text-xs"
                              >
                                YES
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={attribute.name}
                                value="no"
                                id={`${attribute.name}_no`}
                                checked={formState[attribute.name] === "no"}
                                onChange={handleDbChange}
                              />
                              <Label
                                htmlFor={`${attribute.name}_no`}
                                className="text-xs"
                              >
                                NO
                              </Label>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            name={attribute.name}
                            className="flex h-10 w-60 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                            placeholder={`Enter ${attribute.attribute.toLowerCase()}`}
                            value={formState[attribute.name] || ""}
                            onChange={handleDbChange}
                          />
                        </>
                      )}
                    </span>
                  </div>
                  <Separator />
                </div>
              );
            })}
          </div>
          <div className="flex flex-row justify-center items-center my-8 gap-4">
            <AdSubmitBtn
              isLoading={isLoading}
              text={`add plan`}
              addClass={`w-auto`}
            />
            <Button type="button" variant="outline" className="uppercase">
              Back to Plans
            </Button>
          </div>
        </form>
      </div>
    </AdContentWrapper>
  );
};
export default AdAddEditPlan;

// Loader function starts ------
export const loader = async () => {
  try {
    const response = await customFetch.get(`/admin/plan-attributes/all`);
    const attributes = response.data.data.rows;
    return { attributes };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};
