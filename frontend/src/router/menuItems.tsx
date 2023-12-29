import {
  ItemsIcon,
  JobIcon,
  NotesIcon,
  SettingsIcon,
  UsersIcon,
} from "../icons";
import * as Routes from "./paths";

export default [
  {
    path: Routes.JOBS,
    name: "Jobs",
    icon: JobIcon,
    access: "Any",
  },
  {
    path: Routes.LIBRARY_ITEMS,
    name: "Library Items",
    icon: ItemsIcon,
    access: "Any",
    subItems: {
      access: "Owner",
      items: [
        {
          path: Routes.LIBRARY_ITEM_CATEGORIES,
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
