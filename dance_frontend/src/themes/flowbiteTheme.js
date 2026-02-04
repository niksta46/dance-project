import { createTheme } from "flowbite-react";

export const customFlowbiteTheme = createTheme({
  // Override Navbar to use your custom colors
  navbar: {
    root: {
      base: "bg-primary-500 px-2 py-2.5 sm:px-4 dark:border-gray-700 dark:bg-gray-800",
      rounded: {
        on: "rounded",
        off: ""
      },
      bordered: {
        on: "border border-gray-200 dark:border-gray-700",
        off: ""
      },
      inner: {
        base: "mx-auto flex flex-wrap items-center justify-between",
        fluid: {
          on: "",
          off: "container"
        }
      }
    },
    brand: {
      base: "flex items-center"
    },
    collapse: {
      base: "w-full md:block md:w-auto",
      list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
      hidden: {
        on: "hidden",
        off: ""
      }
    },
    link: {
      base: "block py-2 pl-3 pr-4 md:p-0",
      active: {
        on: `bg-primary-600 text-white md:bg-transparent md:text-white dark:text-white`,
        off: "border-b border-primary-400 text-white hover:bg-primary-600 md:border-0 md:hover:bg-transparent md:hover:text-white dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
      },
      disabled: {
        on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        off: ""
      }
    },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-primary-600",
      icon: "h-6 w-6 shrink-0"
    }
  },
  
  // Override Button to use your colors
  button: {
    base: "group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 focus:outline-none",
    full: "w-full",
    color: {
      primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
      secondary: "bg-secondary-500 text-gray-900 hover:bg-secondary-600 focus:ring-4 focus:ring-secondary-300 dark:bg-secondary-600 dark:text-white dark:hover:bg-secondary-700 dark:focus:ring-secondary-800",
      // ... other colors
    },
    disabled: "cursor-not-allowed opacity-50"
  },
  
  // Override Card for better consistency
  card: {
    root: {
      base: "flex rounded-none border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
      children: "flex h-full flex-col justify-center gap-4 p-6",
      horizontal: {
        off: "flex-col",
        on: "flex-col md:flex-row"
      },
      href: "hover:bg-gray-50 dark:hover:bg-gray-800"
    },
    img: {
      base: "",
      horizontal: {
        off: "rounded-t-lg",
        on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
      }
    }
  }
});