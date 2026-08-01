
const getBadgeBackgroundColor = (title: string) => {
    if (title.toLowerCase().includes("housekeeper")) {
      return "dark:!bg-orange-500"
    }

    if (title.toLowerCase().includes("backend")) {
      return "dark:!bg-blue-500"
    }

    return "dark:!bg-white"  
  }

  export default getBadgeBackgroundColor;