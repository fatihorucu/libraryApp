import createHttpError from "http-errors";
import TableModel from "../models/table";
import { type RequestHandler } from "express";

export const getTables: RequestHandler = async (req, res, next) => {
  try {
    const tables = await TableModel.find().exec();
    res.status(200).json(tables);
  } catch (error) {
    next(error);
  }
};

interface createTableBody {
  category?: string;
  numberOfChairs?: number;
  numberOfRows?: number;
  numberOfCols?: number;
}

export const createTable: RequestHandler<
  unknown,
  unknown,
  createTableBody,
  unknown
> = async (req, res, next) => {
  const category = req.body.category;
  const numberOfChairs = req.body.numberOfChairs;
  const numberOfCols = req.body.numberOfCols;
  const numberOfRows = req.body.numberOfRows;
  try {
    if (!category) {
      throw createHttpError(400, "Table must have a category");
    }

    const existingCategory = await TableModel.findOne({
      category: category,
    }).exec();
    if (existingCategory) {
      throw createHttpError(409, "Category must be unique");
    }
    const newTable = await TableModel.create({
      category: category,
      numberOfChairs: numberOfChairs,
      numberOfRows: numberOfRows,
      numberOfCols: numberOfCols,
    });

    res.status(201).json(newTable);
  } catch (error) {
    next(error);
  }
};
