package interfaces

import "backend-go/src/models"

type AuthService interface {
	Register(u *models.User) (string, error)
	Login(usuario, password string) (string, *models.User, error)
	Logout(token string) error
}
