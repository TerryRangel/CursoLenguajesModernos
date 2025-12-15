from typing import Optional
from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):
    nombre: str
    apaterno: str
    amaterno: str
    direccion: str
    telefono: str
    ciudad: str
    estado: str
    email: EmailStr
    usuario: str
    password: str
    updatedAt: Optional[int] = None
    createdAt: Optional[int] = None
    deletedAt: Optional[bool] = None
    
