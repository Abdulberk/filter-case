export interface CategoryProps {
    category: {
      id: number;
      name: string;
      checked: boolean;
    };
    onCheckboxClick: (id: number) => void;
  }

