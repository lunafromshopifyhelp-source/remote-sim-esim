import { Router, Response } from "express";
import { authenticateToken, AuthenticatedRequest } from "../middleware/authMiddleware";
import { Conversion } from "../models/Conversion";
const router = Router();

router.post(
  "/",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const {
        carrier,
        phoneNumber,
        eid,
        fullName,
        verificationId,
      } = req.body;

      if (
        !carrier ||
        !phoneNumber ||
        !eid ||
        !fullName ||
        !verificationId
      ) {
        return res.status(400).json({
          message: "All conversion information is required",
        });
      }

      const conversion = await Conversion.create({
        userId,
        carrier,
        phoneNumber,
        eid,
        fullName,
        verificationId,
        status: "SUBMITTED",
      });

      return res.status(201).json({
        message: "Conversion request submitted successfully",
        conversion: {
          id: conversion._id,
          carrier: conversion.carrier,
          phoneNumber: conversion.phoneNumber,
          eid: conversion.eid,
          status: conversion.status,
          createdAt: conversion.createdAt,
        },
      });
    } catch (error) {
      console.error("Conversion creation error:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

router.get(
  "/my-requests",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const conversions = await Conversion.find({
        userId,
      }).sort({
        createdAt: -1,
      });

      return res.status(200).json({
        conversions,
      });
    } catch (error) {
      console.error("Get conversions error:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

router.get(
  "/:id",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const conversion = await Conversion.findOne({
        _id: req.params.id,
        userId,
      });

      if (!conversion) {
        return res.status(404).json({
          message: "Conversion request not found",
        });
      }

      return res.status(200).json({
        conversion,
      });
    } catch (error) {
      console.error("Get conversion error:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);
router.post(
  "/:id/process",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const conversion = await Conversion.findOne({
        _id: req.params.id,
        userId,
      });

      if (!conversion) {
        return res.status(404).json({
          message: "Conversion request not found",
        });
      }

      const statusFlow: Record<string, string> = {
        SUBMITTED: "CARRIER_PROCESSING",
        CARRIER_PROCESSING: "ESIM_READY",
        ESIM_READY: "INSTALLING",
        INSTALLING: "ACTIVATED",
        ACTIVATED: "COMPLETED",
      };

      const nextStatus = statusFlow[conversion.status];

      if (!nextStatus) {
        return res.status(400).json({
          message: `Conversion cannot be processed from status: ${conversion.status}`,
        });
      }

      conversion.status = nextStatus as any;

      if (nextStatus === "COMPLETED") {
        conversion.completedAt = new Date();
      }

      await conversion.save();

      return res.status(200).json({
        message: "Conversion status updated successfully",
        conversion: {
          id: conversion._id,
          status: conversion.status,
          completedAt: conversion.completedAt,
        },
      });
    } catch (error) {
      console.error("Conversion processing error:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);
export default router;