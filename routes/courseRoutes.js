const { Router } = require('express');
const Course = require('../schema/courseSchema');

const router = Router();


// Get paginated courses + filters
router.get('/courses', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const entranceExam = req.query.entranceExam || 'all';
  const competitiveExam = req.query.competitiveExam || 'all';

  try {
      // filter
      let filter = {};
      if (entranceExam !== 'all') {
          filter.entranceExam = entranceExam;
      }
      if (competitiveExam !== 'all') {
          filter.competitiveExam = competitiveExam;
      }

      const totalCourses = await Course.countDocuments(filter);
      const totalPages = Math.ceil(totalCourses / limit);

      const courses = await Course.find(filter)
          .limit(limit)
          .skip((page - 1) * limit);

      res.status(200).json({
          courses,
          totalPages,
          currentPage: page,
          totalCourses
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Add a new course
router.post('/courses', async (req, res) => {
    try {
        const { title, content, price, discount } = req.body;

        // Validate required fields
        if (!title || !content || !price || !discount) {
            return res.status(400).send('Please fill all fields');
        }

        const newCourse = new Course({
            title,
            content,
            price,
            discount,
        });

        await newCourse.save();
        res.status(201).send('Course created successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Bulk Course Creation Route
router.post('/courses/bulk', async (req, res) => {
  try {
      // Insert many courses at once
      const courses = req.body;
      const createdCourses = await Course.insertMany(courses);
      
      res.status(201).json({
          message: `Successfully created ${createdCourses.length} courses`,
          courses: createdCourses
      });
  } catch (error) {
      console.error('Bulk insert error:', error);
      res.status(500).json({ 
          message: 'Failed to insert courses', 
          error: error.message 
      });
  }
});

module.exports = router;