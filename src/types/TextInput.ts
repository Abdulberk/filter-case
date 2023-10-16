export interface TextInputProps {
    placeholder: string;
    value: string | number | readonly string[] | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    useCase: "text" | "search";
  }

  