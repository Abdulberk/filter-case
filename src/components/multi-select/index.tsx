
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Fuse from "fuse.js";
import {useQuery} from "react-query"
import fetchItems from "../../api/fetchItems";
import TextInput from "../custom-inputs/TextInput";
import Category from "../category";
import Feature from "../feature";
import useLocalStorageState from "../hooks/useLocalStorageState";

export interface PriceRange {
    min: string | number | readonly string[] | undefined;
    max: string | number | readonly string[] | undefined;
  }
 
  
export interface Category {
  id: number;
  name: string;
  checked: boolean;
}

const Sidebar: React.FC = () => {


  const [categories, setCategories] = useLocalStorageState<Category[]>("categories", []);
  const [allCategoriesSelected, setAllCategoriesSelected] = useLocalStorageState<boolean>("allCategoriesSelected", false);
  const [searchedCategories, setSearchedCategories] = useLocalStorageState<string>("searchedCategories", "");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);


const { data: apiCategories} = useQuery("items", fetchItems, {
  enabled: !localStorage.getItem("categories"),

});

const options = {
    includeScore: true,
    keys: ["name"],
};

// eslint-disable-next-line react-hooks/exhaustive-deps
const fuse = new Fuse(categories, options);


  const transformApiDataToCategories = (apiData: string[]): Category[] => {
    return apiData.map((name, index) => {
      return {
        id: index + 1, 
        name: name,
        checked: false, 
      };
    });
  };

    useEffect(() => {
        if (apiCategories) {
            
        const transformedCategories = transformApiDataToCategories(apiCategories);
        setCategories(transformedCategories);
        }
    }, [apiCategories]);



  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: undefined,
    max: undefined,
  });

  

  const [features, setFeatures] = useState([
    { id: 1, name: "Çevrimiçi Satıcı", checked: false },
    { id: 2, name: "Otomatik Teslimat", checked: false },
    { id: 3, name: "Güvenilir Satıcı", checked: false },
  ]);


  useEffect(() => {
    if (searchedCategories === "") {
      setFilteredCategories(categories);
      return;
    }


    const searchResult = fuse.search(searchedCategories);

    setFilteredCategories(searchResult.map((result) => result.item));



  }, [searchedCategories, categories, fuse]);

  const handleCheckboxClick = (id: number): void => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id
          ? { ...category, checked: !category.checked }
          : category
      )
    );
  };

  const handleSelectAll = () => {
    if (allCategoriesSelected) {
      setCategories((prevCategories) =>
        prevCategories.map((category) => ({ ...category, checked: false }))
      );
      return;
    }

    setCategories((prevCategories) =>
      prevCategories.map((category) => ({ ...category, checked: true }))
    );
  };

  useEffect(() => {
    if (categories.every((category) => category.checked)) {
      setAllCategoriesSelected(true);
    } else {
      setAllCategoriesSelected(false);
    }
  }, [categories, setAllCategoriesSelected]);

  const handleFeatureCheckboxClick = (id: number): void => {
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.id === id ? { ...feature, checked: !feature.checked } : feature
      )
    );
  };


  useEffect(() => {

    const sortCheckedFirst = (a: Category, b: Category) => {
      if (a.checked && !b.checked) {
        return -1;
      }
      if (!a.checked && b.checked) {
        return 1;
      }
    

      return 0;
    };

    setFilteredCategories((prevCategories) =>
      prevCategories.sort(sortCheckedFirst)
    );

  }
  , [categories,fuse,searchedCategories]);

  return (
    <aside className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Kategoriler</h2>
        <TextInput
          placeholder="Kategorilerde Ara"
          value={searchedCategories}
          onChange={(e) => setSearchedCategories(e.target.value)}
          useCase="search"
        />
      </div>
      <div className={styles.categoriesContainer}>
        <ul className={styles.categories}>
         
          {filteredCategories.map((category) => (
            <Category
              key={category.id}
              category={category}
              onCheckboxClick={handleCheckboxClick}
            />
          ))}
        </ul>
        <button className={styles.selectAllButton} onClick={handleSelectAll}>
          {allCategoriesSelected ? "Tümünü Kaldır" : "Tümünü Seç"}
        </button>
      </div>
      <div className={styles.priceRangeContainer}>
        <h2 className={styles.title}>Fiyat Aralığı</h2>
        <div className={styles.inputBoxContainer}>
          <TextInput
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
            useCase="text"
          />
          <TextInput
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
            useCase="text"
          />
        </div>
      </div>
     
    
      <div className={styles.otherFeatures}>
        <h2 className={styles.title}>Diğer Özellikler</h2>
        <ul className={styles.featuresList}>
          {features.map((feature) => (
            <Feature
              key={feature.id}
              feature={feature}
              onCheckboxClick={handleFeatureCheckboxClick}
            />
          ))}
        </ul>
      </div>
      <button className={styles.applyFilterButton}>Ara</button>
    </aside>
  );
};

export default Sidebar;