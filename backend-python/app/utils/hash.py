import bcrypt as bycrypt


def hash_password(password: str) -> str:
    return bycrypt.hashpw(password.encode('utf-8'), bycrypt.gensalt()).decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bycrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))