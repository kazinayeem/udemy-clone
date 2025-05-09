import { course, enrollment, user } from "../config/db";
import { Request, Response } from "express";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";
interface CustomRequest extends Request {
  params: {
    teacherId: string;
  };
}
export const courseApproved = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId } = req.params;
  console.log(courseId);
  
  try {
    const existingCourse = await course.findUnique({
      where: { id: courseId },
    });

    if (!existingCourse) {
        console.log("c");
        
      res.status(404).json({ message: "Course not found" });
      return;
    }
    const courseResponse = await course.update({
      where: {
        id: courseId,
      },
      data: {
        approval: true,
      },
    });
    if (!courseResponse) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.status(200).json(courseResponse);
  } catch (error) {
    console.error("Error banning teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const courseUnApproved = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId } = req.params;
  try {
    const courseResponse = await course.update({
      where: {
        id: courseId,
      },
      data: {
        approval: false,
      },
    });
    if (!courseResponse) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.status(200).json(courseResponse);
  } catch (error) {
    console.error("Error banning teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCourse = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const response = await course.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.error("Error banning teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const bannedTecher = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { teacherId } = req.params;

  try {
    const teacherResponse = await user.update({
      where: {
        id: teacherId,
      },
      data: {
        isActive: false,
      },
    });
    if (!teacherResponse) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    res.status(200).json(teacherResponse);
  } catch (error) {
    console.error("Error banning teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unBannedTecher = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { teacherId } = req.params;

  try {
    const teacherResponse = await user.update({
      where: {
        id: teacherId,
      },
      data: {
        isActive: true,
      },
    });
    if (!teacherResponse) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    res.status(200).json(teacherResponse);
  } catch (error) {
    console.error("Error unbanning teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllTeachers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const teachers = await user.findMany({
      where: {
        role: "TEACHER",
      },
      include: {
        course: true,
      },
    });
    if (!teachers) {
      res.status(404).json({ message: "No teachers found" });
      return;
    }

    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTeacherById = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { teacherId } = req.params;

  try {
    const teacher = await user.findUnique({
      where: {
        id: teacherId,
      },
    });
    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTeacherCourses = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { teacherId } = req.params;

  try {
    const courses = await user.findUnique({
      where: {
        id: teacherId,
      },
      include: {
        course: {
          include: {
            lessons: true,
            Chapter: true,
            category: true,
            user: true,
          },
        },
      },
    });
    if (!courses) {
      res.status(404).json({ message: "No courses found for this teacher" });
      return;
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching teacher's courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTeacherCoursesById = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { teacherId } = req.params;

  try {
    const courses = await user.findUnique({
      where: {
        id: teacherId,
      },
      include: {
        course: true,
      },
    });
    if (!courses) {
      res.status(404).json({ message: "No courses found for this teacher" });
      return;
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching teacher's courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTeacherByEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.params;

  try {
    const teacher = await user.findUnique({
      where: {
        email: email,
      },
    });
    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const students = await user.findMany({
      where: {
        role: "STUDENT",
      },
      include: {
        enrollment: true,
      },
    });
    if (!students) {
      res.status(404).json({ message: "No students found" });
      return;
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { studentId } = req.params;

  try {
    const student = await user.findUnique({
      where: {
        id: studentId,
      },
    });
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentByEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.params;

  try {
    const student = await user.findUnique({
      where: {
        email: email,
      },
    });
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { studentId } = req.params;
  try {
    const courses = await user.findUnique({
      where: {
        id: studentId,
      },
      include: {
        enrollment: {
          include: {
            course: {
              include: {
                lessons: true,
                Chapter: true,
                category: true,
                user: true,
              },
            },
          },
        },
      },
    });
    if (!courses) {
      res.status(404).json({ message: "No courses found for this student" });
      return;
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching student's courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSalesReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { teacherId } = req.params;

  try {
    const salesReport = await user.findUnique({
      where: {
        id: teacherId,
      },
      include: {
        course: {
          include: {
            enrollments: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    if (!salesReport) {
      res
        .status(404)
        .json({ message: "No sales report found for this teacher" });
      return;
    }

    res.status(200).json(salesReport);
  } catch (error) {
    console.error("Error fetching sales report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const totalCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totalCourses = await course.count();
    res.status(200).json({ totalCourses });
  } catch (error) {
    console.error("Error fetching total courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMonthlySales = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const now = new Date();
    const monthlySales = await Promise.all(
      Array.from({ length: 6 }).map(async (_, i) => {
        const monthStart = startOfMonth(subMonths(now, i));
        const monthEnd = endOfMonth(subMonths(now, i));

        const enrollments = await enrollment.findMany({
          where: {
            createdAt: {
              gte: monthStart,
              lte: monthEnd,
            },
          },
          include: {
            course: true,
          },
        });

        const total = enrollments.reduce((acc, enrollment) => {
          return acc + (enrollment.course?.price ?? 0);
        }, 0);

        return {
          month: monthStart.toLocaleString("default", {
            month: "short",
            year: "numeric",
          }),
          totalSales: total,
        };
      })
    );
    res.json(monthlySales.reverse());
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getTotalSales = async (req: Request, res: Response) => {
  try {
    const totalSellAmount = await enrollment.findMany({
      select: {
        course: {
          select: {
            price: true,
          },
        },
      },
    });
    const totalAmount = totalSellAmount.reduce((sum, enrollment) => {
      return sum + (enrollment.course?.price || 0);
    }, 0);

    res.status(200).json({ totalAmount });
  } catch (error) {
    console.error("Error fetching total sales:", error);
    res.status(500).json({ error: "Failed to fetch total sales" });
  }
};
export const getCourseEnrollments = async (req: Request, res: Response) => {
  try {
    // Get the total number of enrollments per course
    const enrollments = await enrollment.groupBy({
      by: ["courseId"],
      _count: {
        courseId: true,
      },
    });

    const courseIds = enrollments.map((enrollment) => enrollment.courseId);
    const courses = await course.findMany({
      where: {
        id: { in: courseIds },
      },
      select: {
        id: true,
        title: true,
      },
    });

    const courseTitleMap = courses.reduce(
      (map, course) => {
        map[course.id] = course.title;
        return map;
      },
      {} as Record<string, string>
    );

    const formattedData = enrollments.map((enrollment) => ({
      course: courseTitleMap[enrollment.courseId] || "Unknown Course",
      enrollments: enrollment._count.courseId,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching course enrollments:", error);
    res.status(500).json({ error: "Failed to fetch course enrollments" });
  }
};
