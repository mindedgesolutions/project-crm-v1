import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Crm from "@/pages";
import store from "./store";

// Actions start ------
import { action as adSigninAction } from "@/pages/admin/auth/AdSignin";
import { action as adAddEditPlanAction } from "@/pages/admin/plans/AdAddEditPlan";

// Loaders start ------
import { loader as adLayoutLoader } from "@/pages/admin/AdLayout";
import { loader as adAddEditPlanLoader } from "@/pages/admin/plans/AdAddEditPlan";

const router = createBrowserRouter([
  // Website routes start ------
  {
    path: `/`,
    element: <Crm.WbLayout />,
    children: [
      { index: true, element: <Crm.WbLanding /> },
      { path: `who-are-we`, element: <Crm.WbAbout /> },
      { path: `what-we-do`, element: <Crm.WbServices /> },
      { path: `sign-up`, element: <Crm.WbRegister /> },
    ],
  },
  // Website routes end ------

  // Admin routes start ------
  {
    path: `/admin/sign-in`,
    element: <Crm.AdSignin />,
    action: adSigninAction,
  },
  { path: `/admin/forgot-password`, element: <Crm.AdForgotPassword /> },
  { path: `/admin/reset-password`, element: <Crm.AdResetPassword /> },
  {
    path: `/admin`,
    element: <Crm.AdLayout />,
    loader: adLayoutLoader(store),
    children: [
      { path: `dashboard`, element: <Crm.AdDashboard /> },
      { path: `users`, element: <Crm.AdListUsers /> },
      {
        path: `masters/plan-attributes`,
        element: <Crm.AdListPlanAttributes />,
      },
      { path: `masters/plans`, element: <Crm.AdListPlans /> },
      {
        path: `masters/plan/:slug?`,
        element: <Crm.AdAddEditPlan />,
        loader: adAddEditPlanLoader,
        action: adAddEditPlanAction,
      },
    ],
  },
  // Admin routes end ------
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
