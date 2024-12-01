// // app/api/courses/route.js
// import { NextResponse } from 'next/server';

// export async function GET(request) {
//   // Extract query parameters
//   const { searchParams } = new URL(request.url);
//   const page = searchParams.get('page') || '1';
//   const limit = searchParams.get('limit') || '8';

//   try {
//     // Forward the request to the Express backend
//     const response = await fetch(`http://localhost:5000/api/courses?page=${page}&limit=${limit}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         // Add any additional headers if needed
//       },
//       // Important for handling server-side requests
//       cache: 'no-store', // or 'no-cache' depending on your caching strategy
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch courses');
//     }

//     const data = await response.json();

//     // Return the data from the Express backend
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     return NextResponse.json(
//       { message: 'Failed to fetch courses', error: error.message }, 
//       { status: 500 }
//     );
//   }
// }