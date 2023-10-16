import styles from "../multi-select/styles.module.scss";
import Check from "../checkbox/index"
import { CategoryProps } from "../../types/Category";

const Category: React.FC<CategoryProps> = ({ category, onCheckboxClick }) => {
    return (
      <ul>
        <li
          className={`${styles.categoryItem} ${
            category.checked ? styles.selected : ""
          }`}
          key={category.id}
          onClick={() => onCheckboxClick(category.id)}
        >
          <span className={styles.checkIcon}>
            <Check checked={category.checked} />
          </span>
          <span className={styles.listItemText}>{category.name}</span>
        </li>
      </ul>
    );
  };

  export default Category