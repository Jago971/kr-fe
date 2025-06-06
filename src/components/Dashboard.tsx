interface DashboardProps {
  activeComponent: "tasks" | "messages" | "home";
  data: { [key: string]: any }
}

const Dashboard = ({ activeComponent, data }: DashboardProps) => {

  const scrollComponent = () => {
    switch (activeComponent) {
      case "tasks":
        return "translate-x-[-33.33%]";
      case "messages":
        return "translate-x-[-66.66%]";
      default:
        return "translate-x-[0%]";
    }
  };

  return (
    <div className="border h-full overflow-hidden">
      <div
        className={`w-[300%] h-full flex transition-transform duration-300 ${scrollComponent()}`}
      >
        <div className="w-1/3 flex items-center justify-center">Home</div>
        <div className="w-1/3 flex items-center justify-center">Tasks</div>
        <div className="w-1/3 flex items-center justify-center">Messages</div>
      </div>
    </div>
  );
};

export default Dashboard;
