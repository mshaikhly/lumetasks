export interface MobileVisibilityButtonsProps {
    isProjectsVisible: boolean;
    setProjectsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isTasksVisible: boolean;
    setTasksVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isCalendarVisible: boolean;
    setCalendarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }