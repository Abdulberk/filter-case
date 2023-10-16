import axios from 'axios';


const fetchItems = async () => {
    try {

    
    const response = await axios.get('http://localhost:5000/data');
    return response.data;
    }
    catch (error) {
        throw new Error("Veriler çekilirken hata oluştu !" || error);
    }
}

export default fetchItems;
