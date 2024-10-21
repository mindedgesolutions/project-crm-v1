import { AdFooter, AdPageWrapper, AdSidebar, AdTopnav } from "@/components";
import { setCurrentUser } from "@/features/currentUserSlice";
import customFetch from "@/utils/customFetch";
import showError from "@/utils/showError";
import { Outlet, redirect } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const AdLayout = () => {
  return (
    <div className="flex gap-0 md:gap-1">
      <AdSidebar />
      <ScrollArea className="h-screen w-full">
        <AdPageWrapper>
          <AdTopnav />
          <Outlet />
          <AdFooter />
        </AdPageWrapper>
      </ScrollArea>
    </div>
  );
};
export default AdLayout;

// Loader function starts ------
export const loader = (store) => async () => {
  const { currentUser } = store.getState().currentUser;

  try {
    if (!currentUser.name) {
      const response = await customFetch.get(`/auth/current-user`);
      store.dispatch(setCurrentUser(response.data.data.rows[0]));
    }
    return null;
  } catch (error) {
    showError(`Something went! Login required`);
    return redirect(`/admin/sign-in`);
  }
};
