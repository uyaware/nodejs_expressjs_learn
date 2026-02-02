import { handleDetailProductById } from "@/services/product-services";
import { Request, Response } from "express";

export async function getProductDetailClient(req: Request, res: Response) {
  const { id } = req.params;
  const product = await handleDetailProductById(+id);
  return res.render("client/product/detail.ejs", {
    product
  });
}
