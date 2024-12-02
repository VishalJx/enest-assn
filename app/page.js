'use client'

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Card from '@/components/cards/Card';
import FilterCourseSidebar from '@/components/filters/FilterCourseSidebar';

// Shimmer  
const CourseCardShimmer = () => (
  <div className="bg-white w-full sm:w-[16.5rem] h-auto sm:h-[24.7rem] border rounded-lg overflow-hidden shadow-lg animate-pulse">
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

export default function CourseListing() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    entranceExam: 'all',
    competitiveExam: 'all'
  });

  const fetchCourses = async (page, filters) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        page,
        limit: 8,
        entranceExam: filters.entranceExam,
        competitiveExam: filters.competitiveExam
      });

      const response = await fetch(
        `/api/courses?${queryParams}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Allow-Control-Allow-Origin': '*',
          },
        }
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

  useEffect(() => {
    fetchCourses(currentPage, filters);
  }, [currentPage, filters]);

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

  // Filter Change Handler
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setIsSidebarOpen(false);
  };

  // Pagination Handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Toggle Sidebar for Mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="flex flex-col lg:flex-row w-full lg:w-[83%] mx-auto px-4 lg:px-20 py-8 gap-4 lg:gap-12">
      {/* Mobile Filter Toggle Button */}
      <button 
        onClick={toggleSidebar} 
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg"
      >
        Filters
      </button>

      {/* Sidebar - Mobile & Desktop */}
      <div className={`
        fixed inset-0 z-40 bg-black/50 
        ${isSidebarOpen ? 'block' : 'hidden'} 
        lg:static lg:block lg:w-1/4 lg:bg-transparent lg:z-0
      `}>
        <div 
          className={`
            fixed top-0 left-0 w-72 h-full bg shadow-lg transform transition-transform 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:static lg:w-full lg:shadow-none
          `}
        >
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden absolute top-4 right-4 text-2xl"
          >
            ×
          </button>
          <FilterCourseSidebar onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Course Content */}
      <div className="w-full">
        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 max-w-md w-full bg-gray-100 mb-8">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search entrance test, competitive exams"
            className="flex-1 py-1 bg-transparent outline-none text-sm placeholder-gray-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Course Grid */}
        <div className="flex flex-wrap gap-5">
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
          <div className="flex flex-wrap justify-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded m-1 ${
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
                className={`px-4 py-2 border m-1 ${
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
              className={`px-4 py-2 border rounded m-1 ${
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
            No courses found matching your search and filters.
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