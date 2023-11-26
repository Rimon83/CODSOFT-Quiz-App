"use client"
import { Button, Typography,Box, CircularProgress } from "@mui/material";
import Input from "./Input";
import {useEffect, useState} from "react"
import getCategories from "../lib/getCategories";
import { difficulty, type } from "../lib/getConstData";
import { useRouter } from "next/navigation";


const Settings = () => {
 const [categories, setCategories] = useState([]);
 const [loading, setLoading] = useState(true)
 const [valid, setValid] = useState(true)
 const router = useRouter()

 const url = "https://opentdb.com/api_category.php";
 useEffect(() => {
  async function treatGetData(){

  const data = await getCategories(url);
  const category = data.trivia_categories
  setCategories(category)
  setLoading(false)
  }
  treatGetData();

 },[url])

 if (loading){
  return (
    <Box className="flex justify-center items-center mt-[400px]">
      <CircularProgress/>
    </Box>
  );
 }

 const handleSubmit = (e) => {
  e.preventDefault();
  router.push("/questions");
 }

  return (
    <section className=" flex flex-col justify-center items-center gap-6 md:w-1/2 md:mx-auto border rounded-lg border-gray-300  mx-5 mt-40 p-4">
      <Typography variant="h2" fontWeight="bold">
        Quizfast
      </Typography>
      <h2 className="text-2xl">Settings</h2>
      <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input label="category" options={categories} setValid={setValid} />
        <Input label="type" options={type} setValid={setValid} />
        <Input label="difficulty" options={difficulty} setValid={setValid} />
        <Input label="number" setValid={setValid} />
        <Button
          className="bg-blue-600 capitalize mt-4"
          fullWidth
          variant="contained"
          type="submit"
          width="100%"
          disabled={valid}
        >
          Get Started
        </Button>
      </form>
    </section>
  );
};

export default Settings;
