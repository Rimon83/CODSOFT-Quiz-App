
const getCategories = async (url) => {
  
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
 };

 export default getCategories
