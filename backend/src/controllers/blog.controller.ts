import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getAllData, saveToDynamoDB } from '../services/dynamodb';

interface Data {
  id: string;
  author: string;
  title: string;
  content: string;
  timestamp: string;
}

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { author, content, title } = req.body;
    const timestamp = new Date().toISOString();
    const id = uuidv4();
    const data: Data = {
      id: id,
      author: author,
      title: title,
      content: content,
      timestamp: timestamp,
    };
    const response = await saveToDynamoDB(data);
    res.status(200).send({
      status: 200,
      message: 'Saved successfully',
      data: response,
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: 'Something Went Wrong',
      error: err,
    });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const data = await getAllData();
    res.send({
      status: res.statusCode,
      message: 'Data retrieved successfully!',
      data: data,
    });
  } catch (e) {
    res.send("Couldn't complete the request now. Try again later!");
  }
};
