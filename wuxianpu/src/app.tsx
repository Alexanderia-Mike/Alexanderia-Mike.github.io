import HarmonySinging from "./apps/harmony-singing";
import StaffSingleNote from "./apps/staff-single-note";
import { Router, RouteConfig } from "./common/router/router";

export default function App() {
  const routes: RouteConfig[] = [
    {
      path: "wuxianpu",
      element: <StaffSingleNote />,
      label: "五线谱单音练习",
    },
    {
      path: "harmony",
      element: <HarmonySinging />,
      label: "和声音程模唱练习",
    },
  ];

  return (
    <Router
      urlRouter={true}
      routes={routes}
      defaultRoute="wuxianpu"
      classNames={{
        navContainer: "mb-5",
        contentContainer: "px-4",
        contentColor: "bg-custom-bg",
        navColor: "bg-white",
        // activeNavItem: "bg-custom-bg",
      }}
    />
  );
}
