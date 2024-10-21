import {
  AdContentWrapper,
  PaginationContainer,
  SkeletonTableRow,
} from "@/components";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import customFetch from "@/utils/customFetch";
import { serialNo } from "@/utils/functions";
import { splitErrors } from "@/utils/splitErrors";
import dayjs from "dayjs";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdListPlans = () => {
  document.title = `List of Available Plans | ${
    import.meta.env.VITE_APP_TITLE
  }`;
  const [plans, setPlans] = useState([]);
  const [meta, setMeta] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get("page");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/admin/plans`, {
        params: {
          page: page || "",
        },
      });
      setPlans(response.data.data.rows);
      setMeta(response.data.meta);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      splitErrors(error?.response?.data?.msg);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, queryString.get("type"), queryString.get("search")]);

  return (
    <AdContentWrapper>
      <div className="flex flex-row justify-between items-center bg-muted my-4 p-2">
        <h3 className="font-bold text-xl tracking-widest text-muted-foreground">
          List of Available Plans
        </h3>
        <Link to={`/admin/masters/plan`}>
          <Button className="capitalize tracking-wider">add new</Button>
        </Link>
      </div>
      <div className="my-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sl. No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Tenure</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <SkeletonTableRow />
                </TableCell>
              </TableRow>
            ) : plans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  NO DATA FOUND
                </TableCell>
              </TableRow>
            ) : (
              plans?.map((plan, index) => {
                const { name, tenure, price, updated_at } = plan;
                return (
                  <TableRow key={plan.id} className="group">
                    <TableCell className="font-medium">
                      {serialNo(page) + index}.
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{tenure}</TableCell>
                    <TableCell>{price}</TableCell>
                    <TableCell>
                      {dayjs(new Date(updated_at)).format("MMM D, YYYY h:mm A")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col justify-end items-center md:flex-row space-y-1 md:gap-4">
                        <button type="button">
                          <Eye
                            size={18}
                            className="text-muted-foreground transition duration-200 group-hover:text-blue-500"
                          />
                        </button>
                        <Link to={`/admin/masters/plan/${plan.slug}`}>
                          <button type="button">
                            <Pencil
                              size={18}
                              className="text-muted-foreground transition duration-200 group-hover:text-yellow-500"
                            />
                          </button>
                        </Link>
                        <button type="button">
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      {meta.totalPages > 1 && (
        <PaginationContainer
          totalPages={meta.totalPages}
          currentPage={meta.currentPage}
        />
      )}
    </AdContentWrapper>
  );
};
export default AdListPlans;
