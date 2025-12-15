from fastapi import APIRouter
from app.controllers import user_controllers
from app.schema.user_schema import UserLogin, UserRegister

router = APIRouter()

#Rutas publicas
router.post("/auth/register")(user_controllers.register)
router.post("/auth/login")(user_controllers.login)

#Rutas protegidas
router.get("/usuarios")(user_controllers.list_users)
router.get("/usuarios/{user_id}")(user_controllers.get_user)
router.put("/usuarios/{user_id}")(user_controllers.update_user)
router.delete("/usuarios/{user_id}")(user_controllers.delete_user)
