const { Router } = require('express');
const Course = require('../schema/courseSchema');

const router = Router();


// Get paginated courses
router.get('/courses', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
  
    try {
      const totalCourses = await Course.countDocuments(); 
      const totalPages = Math.ceil(totalCourses / limit);
  
      const courses = await Course.find()
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


module.exports = router;