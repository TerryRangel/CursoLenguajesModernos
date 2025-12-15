package interfaces

import "backend-go/src/models"

type UserRepository interface {
	Create(u *models.User) (string, error)
	GetAll() ([]*models.User, error)
	GetByID(id string) (*models.User, error)
	GetByUsuario(usuario string) (*models.User, error)
	Update(id string, u *models.User) error
	Delete(id string) error
	ExistsByUsuario(usuario string) (bool, error)
	ExistsByFullName(nombre, apaterno, amaterno string) (bool, error)
}
