import type { Request, Response } from "express";
import { course, enrollment, user } from "../config/db";
import { Prisma } from "../../generated/prisma";
import SSLCommerzPayment from "sslcommerz-lts";

const store_id = "kazi67f0c67596ef9";
const store_passwd = "kazi67f0c67596ef9@ssl";
const is_live = false;
export const courseEnrollment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  const { courseId } = req.body;

  if (!userId || !courseId) {
    res.status(400).json({ message: "User ID and Course ID are required." });
    return;
  }

  try {
    // Verify that the user exists
    const existingUser = await user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    // Check if the user is already enrolled in the course
    const existingEnrollment = await enrollment.findFirst({
      where: {
        userId,
        courseId,
      },
    });

    if (existingEnrollment) {
      res
        .status(409)
        .json({ message: "User is already enrolled in this course." });
      return;
    }

    const coursePrice = await course.findUnique({ where: { id: courseId } });
    const newEnrollment = await enrollment.create({
      data: {
        courseId,
        userId,
        status: false,
      },
    });

    const data = {
      total_amount: coursePrice?.price,
      currency: "BDT",
      tran_id: newEnrollment?.id,
      success_url: `http://localhost:8080/api/enrollment/success?id=${newEnrollment.id}`,
      fail_url: `http://localhost:8080/api/enrollment/fail?id=${newEnrollment.id}`,
      cancel_url: `http://localhost:8080/api/enrollment/cancel?id=${newEnrollment.id}`,
      ipn_url: "http://localhost:8080/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: "Customer Name",
      cus_email: "customer@example.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse: any) => {
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.status(201).json({
        message: "Enrollment created successfully.",
        enrollment: newEnrollment,
        GatewayPageURL,
      });
    });
  } catch (error) {
    console.error("Enrollment error:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res
        .status(400)
        .json({ message: "Database error occurred.", details: error.message });
    } else {
      res.status(500).json({ message: "Server error occurred." });
    }
  }
};

export const success = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ message: "id not found" });
      return;
    }

    const findCourse = await enrollment.findUnique({
      where: { id: id as string },
    });

    if (!findCourse) {
      res.status(400).json({ message: "course not found" });
      return;
    }

    const data = await enrollment.update({
      where: { id: id as string },
      data: {
        status: true,
        paymentMethod: "SSLCommerzPayment",
      },
    });

    res.redirect(`http://localhost:3000/course/${data.courseId}`);
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({ message: "Database error occurred." });
  }
};
export const failed = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ message: "id not found" });
      return;
    }

    const findCourse = await enrollment.findUnique({
      where: { id: id as string },
    });

    if (!findCourse) {
      res.status(400).json({ message: "course not found" });
      return;
    }

    await enrollment.delete({
      where: {
        id: id as string,
      },
    });

    res.redirect(`http://localhost:3000/payment-failed`);
  } catch (error) {
    console.error("Failed payment error:", error);
    res.status(500).json({ message: "Database error occurred." });
  }
};
export const cancel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ message: "id not found" });
      return;
    }

    const findCourse = await enrollment.findUnique({
      where: { id: id as string },
    });

    if (!findCourse) {
      res.status(400).json({ message: "course not found" });
      return;
    }

    await enrollment.delete({
      where: {
        id: id as string,
      },
    });

    res.redirect(`http://localhost:3000/payment-cancelled`);
  } catch (error) {
    console.error("Canceled payment error:", error);
    res.status(500).json({ message: "Database error occurred." });
  }
};

export const MyEnrollmentCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ message: "User ID and Course ID are required." });
    return;
  }

  try {
    const mycourse = await enrollment.findMany({
      where: {
        userId,
        status: true,
      },
      include: {
        course: true,
      },
    });
    res.status(200).json(mycourse);
  } catch (error) {
    console.error("Check enrollment error:", error);
    res.status(500).json({ message: "Server error occurred." });
  }
};
export const getMyCourseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  const courseId = req.params.courseId;

  if (!userId || !courseId) {
    res.status(400).json({ message: "User ID and Course ID are required." });
    return;
  }

  try {
    const courseEnrollment = await enrollment.findFirst({
      where: {
        userId,
        courseId,
        status: true,
      },
      include: {
        course: {
          include: {
            category: true,
            Chapter: {
              orderBy: {
                createdAt: "asc",
              },
              include: {
                lessons: {
                  orderBy: {
                    createdAt: "asc",
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!courseEnrollment) {
      res.status(403).json({ message: "You are not enrolled in this course." });
      return;
    }

    res.status(200).json(courseEnrollment.course);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ message: "Server error occurred." });
  }
};
export const checkEnrollmentStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  const courseId = req.params.courseId;

  if (!userId || !courseId) {
    res.status(400).json({ message: "User ID and Course ID are required." });
    return;
  }

  try {
    const existingEnrollment = await enrollment.findFirst({
      where: {
        userId,
        courseId,
        status: true,
      },
    });

    if (existingEnrollment) {
      res.status(200).json({ enrolled: true });
    } else {
      res.status(200).json({ enrolled: false });
    }
  } catch (error) {
    console.error("Check enrollment error:", error);
    res.status(500).json({ message: "Server error occurred." });
  }
};
