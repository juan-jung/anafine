import { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "pages/axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axiosInstance.get("/category/large", {
      params: req.body,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    res.status(500).json({ error: "오류가 발생했습니다." });
  }
};
