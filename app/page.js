'use client'

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Card from '@/components/cards/Card';
import FilterCourseSidebar from '@/components/filters/FilterCourseSidebar';

// Shimmer Loading Component
const CourseCardShimmer = () => (
  <div className="bg-white w-[16.5rem] h-[24.7rem] border rounded-lg overflow-hidden shadow-lg animate-pulse">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

// Main Page Component
export default function CourseListing() {
  // State Management
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Courses
  const fetchCourses = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/courses?page=${page}&limit=8`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      
      setCourses(data.courses);
      setFilteredCourses(data.courses);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      setError('Failed to load courses. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial Data Fetch
  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage]);

  // Search Handler
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = courses.filter(course => 
      course.title.toLowerCase().includes(term)
    );

    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  // Pagination Handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Render
  return (
    <main className="flex w-[80%] mx-auto border gap-12 px-20 py-8">
      <div>
        <FilterCourseSidebar />
      </div>
      <div className="flex-1">
        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 max-w-md w-full bg-gray-100 mb-8">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search entrance test, competitive exams"
            className="flex w-[28rem] py-1 bg-transparent outline-none text-sm placeholder-gray-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array(8).fill(0).map((_, index) => (
                <CourseCardShimmer key={index} />
              ))
            : filteredCourses.map((course) => (
                <Card
                  key={course._id}
                  title={course.title}
                  content={course.content}
                  price={course.price}
                  discount={course.discount}
                />
              ))}
        </div>

        {/* Pagination */}
        {!loading && filteredCourses.length > 0 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded ${
                currentPage === 1 
                  ? 'bg-gray-200 cursor-not-allowed' 
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 border ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded ${
                currentPage === totalPages 
                  ? 'bg-gray-200 cursor-not-allowed' 
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* No Results Handling */}
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            No courses found matching your search.
          </div>
        )}

        {/* Error Handling */}
        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}