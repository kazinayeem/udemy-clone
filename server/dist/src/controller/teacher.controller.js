"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentsForTeacher = exports.getSalesReportForTeacher = exports.getCourseEnrollments = exports.getTotalSales = exports.getMonthlySales = exports.totalCourses = exports.getSalesReport = exports.getStudentCourses = exports.getStudentByEmail = exports.getStudentById = exports.getAllStudents = exports.getTeacherByEmail = exports.getTeacherCoursesById = exports.getTeacherCourses = exports.getTeacherById = exports.getAllTeachers = exports.unBannedTecher = exports.bannedTecher = exports.getAllCourse = exports.courseUnApproved = exports.courseApproved = void 0;
const db_1 = require("../config/db");
const date_fns_1 = require("date-fns");
const courseApproved = async (req, res) => {
    const { courseId } = req.params;
    console.log(courseId);
    try {
        const existingCourse = await db_1.course.findUnique({
            where: { id: courseId },
        });
        if (!existingCourse) {
            console.log("c");
            res.status(404).json({ message: "Course not found" });
            return;
        }
        const courseResponse = await db_1.course.update({
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
    }
    catch (error) {
        console.error("Error banning teacher:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.courseApproved = courseApproved;
const courseUnApproved = async (req, res) => {
    const { courseId } = req.params;
    try {
        const courseResponse = await db_1.course.update({
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
    }
    catch (error) {
        console.error("Error banning teacher:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.courseUnApproved = courseUnApproved;
const getAllCourse = async (req, res) => {
    try {
        const response = await db_1.course.findMany({
            include: {
                user: true,
            },
        });
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error banning teacher:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllCourse = getAllCourse;
const bannedTecher = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const teacherResponse = await db_1.user.update({
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
    }
    catch (error) {
        console.error("Error banning teacher:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.bannedTecher = bannedTecher;
const unBannedTecher = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const teacherResponse = await db_1.user.update({
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
    }
    catch (error) {
        console.error("Error unbanning teacher:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.unBannedTecher = unBannedTecher;
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await db_1.user.findMany({
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
    }
    catch (error) {
        console.error("Error fetching teachers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllTeachers = getAllTeachers;
const getTeacherById = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const teacher = await db_1.user.findUnique({
            where: {
                id: teacherId,
            },
        });
        if (!teacher) {
            res.status(404).json({ message: "Teacher not found" });
            return;
        }
        res.status(200).json(teacher);
    }
    catch (error) {
        console.error("Error fetching teacher:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getTeacherById = getTeacherById;
const getTeacherCourses = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const courses = await db_1.user.findUnique({
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
    }
    catch (error) {
        console.error("Error fetching teacher's courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getTeacherCourses = getTeacherCourses;
const getTeacherCoursesById = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const courses = await db_1.user.findUnique({
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
    }
    catch (error) {
        console.error("Error fetching teacher's courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getTeacherCoursesById = getTeacherCoursesById;
const getTeacherByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const teacher = await db_1.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!teacher) {
            res.status(404).json({ message: "Teacher not found" });
            return;
        }
        res.status(200).json(teacher);
    }
    catch (error) {
        console.error("Error fetching teacher:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getTeacherByEmail = getTeacherByEmail;
const getAllStudents = async (req, res) => {
    try {
        const students = await db_1.user.findMany({
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
    }
    catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllStudents = getAllStudents;
const getStudentById = async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await db_1.user.findUnique({
            where: {
                id: studentId,
            },
        });
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json(student);
    }
    catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getStudentById = getStudentById;
const getStudentByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const student = await db_1.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json(student);
    }
    catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getStudentByEmail = getStudentByEmail;
const getStudentCourses = async (req, res) => {
    const { studentId } = req.params;
    try {
        const courses = await db_1.user.findUnique({
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
    }
    catch (error) {
        console.error("Error fetching student's courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getStudentCourses = getStudentCourses;
const getSalesReport = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const salesReport = await db_1.user.findUnique({
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
    }
    catch (error) {
        console.error("Error fetching sales report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSalesReport = getSalesReport;
const totalCourses = async (req, res) => {
    try {
        const totalCourses = await db_1.course.count();
        res.status(200).json({ totalCourses });
    }
    catch (error) {
        console.error("Error fetching total courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.totalCourses = totalCourses;
const getMonthlySales = async (req, res) => {
    try {
        const now = new Date();
        const monthlySales = await Promise.all(Array.from({ length: 6 }).map(async (_, i) => {
            const monthStart = (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(now, i));
            const monthEnd = (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(now, i));
            const enrollments = await db_1.enrollment.findMany({
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
        }));
        res.json(monthlySales.reverse());
    }
    catch (error) {
        console.error("Error fetching sales:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getMonthlySales = getMonthlySales;
const getTotalSales = async (req, res) => {
    try {
        const totalSellAmount = await db_1.enrollment.findMany({
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
    }
    catch (error) {
        console.error("Error fetching total sales:", error);
        res.status(500).json({ error: "Failed to fetch total sales" });
    }
};
exports.getTotalSales = getTotalSales;
const getCourseEnrollments = async (req, res) => {
    try {
        // Get the total number of enrollments per course
        const enrollments = await db_1.enrollment.groupBy({
            by: ["courseId"],
            _count: {
                courseId: true,
            },
        });
        const courseIds = enrollments.map((enrollment) => enrollment.courseId);
        const courses = await db_1.course.findMany({
            where: {
                id: { in: courseIds },
            },
            select: {
                id: true,
                title: true,
            },
        });
        const courseTitleMap = courses.reduce((map, course) => {
            map[course.id] = course.title;
            return map;
        }, {});
        const formattedData = enrollments.map((enrollment) => ({
            course: courseTitleMap[enrollment.courseId] || "Unknown Course",
            enrollments: enrollment._count.courseId,
        }));
        res.status(200).json(formattedData);
    }
    catch (error) {
        console.error("Error fetching course enrollments:", error);
        res.status(500).json({ error: "Failed to fetch course enrollments" });
    }
};
exports.getCourseEnrollments = getCourseEnrollments;
const getSalesReportForTeacher = async (req, res) => {
    const teacherId = req.user?.id;
    try {
        const teacher = await db_1.user.findUnique({
            where: {
                id: teacherId,
            },
            include: {
                course: {
                    include: {
                        enrollments: true,
                    },
                },
            },
        });
        if (!teacher || teacher.role !== "TEACHER") {
            res.status(404).json({ message: "Teacher not found" });
            return;
        }
        // Construct a simplified report
        const report = teacher.course.map((course) => ({
            courseId: course.id,
            title: course.title,
            price: course.price, // Assuming course has a price field
            totalEnrollments: course.enrollments.length,
            totalEarnings: (course.price ?? 0) * course.enrollments.length,
        }));
        // Optional: compute overall totals
        const totals = report.reduce((acc, curr) => {
            acc.totalEnrollments += curr.totalEnrollments;
            acc.totalEarnings += curr.totalEarnings;
            return acc;
        }, { totalEnrollments: 0, totalEarnings: 0 });
        res.status(200).json({ report, totals });
    }
    catch (error) {
        console.error("Error fetching teacher sales report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSalesReportForTeacher = getSalesReportForTeacher;
const getStudentsForTeacher = async (req, res) => {
    const teacherId = req.user?.id;
    if (!teacherId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const courses = await db_1.course.findMany({
            where: { userId: teacherId },
            select: {
                id: true,
                title: true,
                enrollments: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                image: true,
                                country: true,
                                phone: true,
                                address: true,
                                isActive: true,
                            },
                        },
                    },
                },
            },
        });
        const students = courses.flatMap((course) => course.enrollments.map((enrollment) => ({
            courseId: course.id,
            courseTitle: course.title,
            student: enrollment.user,
        })));
        res.status(200).json({ students });
    }
    catch (error) {
        console.error("Error fetching students for teacher:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getStudentsForTeacher = getStudentsForTeacher;
