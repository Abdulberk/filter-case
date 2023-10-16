import Check from "../checkbox";
import { FeatureProps } from "../../types/Feature";
import styles from "../multi-select/styles.module.scss";


const Feature: React.FC<FeatureProps> = ({ feature, onCheckboxClick }) => {
    return (
      <li
        className={`${styles.featureItem} ${
          feature.checked ? styles.selected : ""
        }`}
        key={feature.id}
        onClick={() => onCheckboxClick(feature.id)}
      >
        <span className={styles.checkIcon}>
          <Check checked={feature.checked} />
        </span>
        <span className={styles.listItemText}>{feature.name}</span>
      </li>
    );
  };
  
  export default Feature;