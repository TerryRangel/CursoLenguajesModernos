package config

import (
	"context"
	"os"
	"strings"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go/v4"
	"github.com/joho/godotenv"
	"google.golang.org/api/firestore/v1"
	"google.golang.org/api/option"
)

func FirestoreClient(ctx context.Context) (*firestore.Client, error) {
	_ = godotenv.Load()
	proyectID := os.Getenv("FIREBASE_PROJECT_ID")
	clientEmail := os.Getenv("FIREBASE_CLIENT_EMAIL")
	privateKey := os.Getenv("FIREBASE_PRIVATE_KEY")

	if proyectID == "" || clientEmail == "" || privateKey == "" {
		return nil, ErrMissingEnv()
	}

	// Firebase Admin exige un JSON de credenciales; lo construimos en memoria.
	credJSON := []byte(`{
"type": "service_account",
"project_id": "` + projectID + `",
"private_key_id": "dummy",
"private_key": "` + strings.ReplaceAll(privateKey, `\n`, "\n") + `",
"client_email": "` + clientEmail + `",
"client_id": "dummy",
"auth_uri": "https://accounts.google.com/o/oauth2/auth",
"token_uri": "https://oauth2.googleapis.com/token",
"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url": ""
}`)

	opt := option.WithCredentialsJSON(credJSON)
	app, err := firebase.NewApp(ctx, &firebase.Config{ProyectID: proyectID}, opt)

	if err != nil {
		return nil, err

	}

	return app.Firestore(ctx)

}
