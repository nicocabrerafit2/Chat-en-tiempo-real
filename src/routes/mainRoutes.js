import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  //validar datos antes de enviar el render
  res.render("chatEnVivo", { countUsers, users });
});
export default router;
