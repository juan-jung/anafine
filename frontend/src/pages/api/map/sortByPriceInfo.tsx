import { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "pages/axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, disLimit, userLatitude, userLongitude } = req.body;

    if (!name || !disLimit || !userLatitude || !userLongitude) {
      res.status(400).json({ error: "모든 필수 데이터를 제공해야 합니다." });
      return;
    }

    const response = await axiosInstance.get("/map/sortByPriceInfo", {
      params: req.body,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    res.status(500).json({ error: "오류가 발생했습니다." });
  }
};
