
const getCategories = async (url) => {
     const res = await fetch(url);
       if (res.ok) {
         return res.json();
       }  
 };

 export default getCategories
