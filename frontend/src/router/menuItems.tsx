import {
  ItemsIcon,
  JobIcon,
  NotesIcon,
  ReportIcon,
  SettingsIcon,
  UsersIcon,
} from "../icons";

export default [
  {
    path: "/jobs",
    name: "Jobs",
    icon: JobIcon,
    access: "Any",
  },
  {
    path: "/reports",
    name: "Reports",
    icon: ReportIcon,
    access: "Any",
  },
  {
    path: "/library-items",
    name: "Library Items",
    icon: ItemsIcon,
    access: "Any",
    subItems: {
      access: "Owner",
      items: [
        {
          path: "/library-items-categories",
          name: "Categories",
        },
      ],
    },
  },
  {
    path: "/inspection-notes",
    name: "Inspection Notes",
    icon: NotesIcon,
    access: "Any",
  },
  {
    path: "/users",
    name: "Users",
    icon: UsersIcon,
    access: "Owner",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: SettingsIcon,
    access: "Owner",
  },
];
