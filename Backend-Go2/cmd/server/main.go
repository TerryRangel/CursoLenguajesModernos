package main

import (
	"log"

	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	if err := config.InitConfig(); err != nil {
		log.Fatalf("Error loading config: %v", err)

	}
	defer config.Firestore.Close()
	r := routes.FireStore.SuperRouter()
}
