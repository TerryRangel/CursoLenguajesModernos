package models

import "time"

type User struct {
	ID        string    `json:"id,omitempty" firestore:"-"`
	Nombre    string    `json:"nombre" firestore:"nombre"`
	Apaterno  string    `json:"apaterno" firestore:"apaterno"`
	Amaterno  string    `json:"amaterno" firestore:"amaterno"`
	Dirrecion string    `json:"direccion" firestore:"direccion"`
	Telefono  string    `json:"telefono" firestore:"telefono"`
	Ciudad    string    `json:"ciudad" firestore:"ciudad"`
	Estado    string    `json:"estado" firestore:"estado"`
	Email     string    `json:"email" firestore:"email"`
	Usuario   string    `json:"usuario,omitempty" firestore:"usuario"`
	Password  string    `json:"password,omitempty" firestore:"password"`
	CreateAt  time.Time `json:"createAt" firestore:"createAt"`
	UpdateAt  time.Time `json:"updateAt" firestore:"updateAt"`
}
