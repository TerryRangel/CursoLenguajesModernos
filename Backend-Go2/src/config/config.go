package config

import (
	"context"
	"fmt"
	"os"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var (
	App          *firebase.App
	Firestore    *firebase.Client
	UsersCol     string
	BlacklistCol string
	ProjectID    string
)

func InitFirebase() error {

	ctx := context.Background()
	UserCol = getenvDefault("FIRESTORE_USERS_COLLECTION", "usuariosgo")
	BlacklistCol = getenvDefault("FIRESTORE_TOKEN_BLACKLIST", "token_blacklist")
	ProjectID = os.Getenv("FIREBASE_PROJECT_ID")

	credPath := os.Getenv("GOOGLE_APPLICATION_CREDENTIALS")

	var app *firebase.App
	var err error

	if credPath != "" {
		opt := option.WithCredentialsFile(credPath)
		app, err = firebase.NewApp(ctx, &firebase.Config{ProjectID: ProjectID}, opt)
	}
	if err != nil {
		return fmt.Errorf("error initializing firebase app: %v", err)
	}

	App = app

	fs, err := app.Firestore(ctx)

	if err != nil {
		return fmt.Errorf("error initializing firestore: %w", err)
	}

	Firestore = fs
	return nil

}

func getenvDefault(k, def string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
}
