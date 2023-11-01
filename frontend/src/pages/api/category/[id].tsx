import { NextApiRequest, NextApiResponse } from "next";
import instance from "pages/axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  try {
    const response = await instance.get(`/category/${id}`);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error making API request:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
