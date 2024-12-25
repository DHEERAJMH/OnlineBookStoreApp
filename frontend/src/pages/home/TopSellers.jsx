import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BookCard from '../books/BookCard.jsx'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Correct path for navigation


// import required modules
import { Pagination,Navigation } from 'swiper/modules';
import booksApi, { useFetchAllBooksQuery } from '../../redux/features/books/booksApi.js'

const categories = ["choose a genre", "Business", "Fiction", "Horror", "Adventure"]

const topSellers = () => {
  
  const [selectedCategory, setselectedCategory] = useState("choose a genre");

  const { data: response = {} } = useFetchAllBooksQuery();
  const books = response.books || []; // Get books array from response, default to an empty array

  // Ensure books is always an array
  if (!Array.isArray(books)) {
    console.error("Books data is not an array:", books);
  }

  // Filter books based on selected category
  const filteredBooks =
    selectedCategory === "choose a genre"
      ? books
      : books.filter(
          (book) => book.category.toLowerCase() === selectedCategory.toLowerCase()
        );

 
  // const filteredBooks = selectedCategory === "choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase());

  return (
    <div className='py-10'>
      <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
      <div className='mb-8 flex items-center'>
        <select
          onChange={(e) => setselectedCategory(e.target.value)} name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
          {
            categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))
          }
        </select>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          }
        }}
        modules={[Pagination,Navigation]}
        className="mySwiper"
      >
        {
          filteredBooks.length > 0 && filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))
        }

      </Swiper>


    </div>
  )
}

export default topSellers
