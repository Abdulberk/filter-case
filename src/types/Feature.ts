export interface FeatureProps {
    feature: {
      id: number;
      name: string;
      checked: boolean;
    };
    onCheckboxClick: (id: number) => void;
  }