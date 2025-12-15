package services

import (
	"backend-go/src/interfaces"
	"backend-go/src/models"
	"errors"
	"strings"
)

type UserService struct {
	repo interfaces.UserRepository
}

func NewUserService(repo interfaces.UserRepository) *UserService {
	return &UserService{repo: repo}

}

func (s *UserService) CreateUser(u *models.User) (string, error) {

	if strings.TrimSpace(u.Usuario) == "" || strings.TrimSpace(u.Password) == "" {

		return "", errors.New("Usuarios y contrasena son obligatorios")

	}
	exists, err := s.repo.ExistsByUsuario(u.Usuario)

	if err != nil {
		return "", err
	}

	if exists {
		return "", errors.New("el usuario ya existe")
	}

	existsFullName, err := s.repo.ExistsByFullName(u.Nombre, u.Apaterno, u.Amaterno)

	if err != nil {
		return "", err
	}

	if existsFullName {
		return "", errors.New("ya existe alguien con el mismo nombre completo")
	}

	hash, err := utils.HashPassword(u.Password)
	if err != nil {
		return "", err
	}

	return s.repo.Create(u)

}
