from jose import JWTError, jwt

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials, OAuth2PasswordBearer
from typing_extensions import Annotated

from backend.configuration import JWT_ALGORITHM, JWT_SECRET_KEY, JWT_ACCESS_TOKEN_EXPIRE_MINUTES

bearer = HTTPBearer()
http_exc = HTTPException(status_code=401, detail="Unauthorized")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def verify_jwt(bearer_auth: Annotated[HTTPAuthorizationCredentials, Depends(bearer)]):
    if bearer_auth.scheme != "Bearer" or bearer_auth.credentials is None:
        raise http_exc

    try:
        jwt.decode(bearer_auth.credentials, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM],
                   options={'require_iat': True, 'require_exp': True, 'require_sub': True})
    except JWTError:
        raise http_exc
