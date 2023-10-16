import SearchIcon from "../multi-select/SearchIcon";
import styles from "../multi-select/styles.module.scss"
import { TextInputProps } from "../../types/TextInput";


  
  const TextInput: React.FC<TextInputProps> = ({
    placeholder,
    value,
    onChange,
    useCase,
  }) => {
    return (
      <>
        {useCase === "search" ? (
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
            <button className={styles.searchIcon}>
              <SearchIcon />
            </button>
          </div>
        ) : (
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </>
    );
  };


export default TextInput;