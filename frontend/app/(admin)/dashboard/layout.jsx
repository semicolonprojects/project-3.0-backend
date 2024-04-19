import Dashboard from "./Dashboard";

export default function DashboardLayout ({children}) {

    return(
      <>
        <Dashboard/>
          <div>
        {children}
          </div>
      </>
    );
};