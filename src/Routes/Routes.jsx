import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import ShowList from "../pages/ShowList/ShowList"
import ShowSummary from "../pages/ShowSummary/ShowSummary"
import BookingForm from "../components/BookingForm/BookingForm";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <ShowList></ShowList>  
        },
        {
            path: '/summary/:id',
            element: <ShowSummary></ShowSummary>
        },
        {
          path: '/booking',
          element: <BookingForm></BookingForm>
        },
        {
          path: '*',
          element: <div className="show-summary">Page Not Found</div>
        }
      ]
    }
  ]);