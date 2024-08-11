import { Router } from "express";
import { usuarioController } from "../controllers/usuario.controller";
import { produtosController } from "../controllers/produto.controller";
const router = Router();

router.post("/usuario", usuarioController.create);
router.get("/usuario", usuarioController.readAll);
router.get("/usuario/:id", usuarioController.read);
router.put("/usuario/:id", usuarioController.update);
router.delete("/usuario/:id", usuarioController.destroy);

router.post("/produto/:id_usuario", produtosController.create);
router.get("/produto", produtosController.readAll);
router.get("/produto/:id", produtosController.read);
router.put("/produto/:id", produtosController.update);
router.delete("/produto/:id", produtosController.destroy);

export default router;