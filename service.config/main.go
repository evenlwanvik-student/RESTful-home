package main

import (
	//"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux" // HTTP router and URL matcher for building Go web servers
	// change back when moving into correct branch
	"./domain"
	//"github.com/evenlwanvik-student/RESTful-home/config/domain"
	"./controller"
	//"github.com/evenlwanvik-student/RESTful-home/config/controller"
	"./service"
	//"github.com/evenlwanvik-student/RESTful-home/config/service"
)

func main() {
	// create the configuration object
	config := domain.Config{}

	// Initialize service to update the configuration file
	configService := service.ConfigService{
		Config: &config,
		Location: "config.yaml",
	}
	go configService.Watch(time.Second * 10)

	// Wrapping my head around this one..
	// setting the controller config field as the adress of the current configuration
	c := controller.Controller{ Config: &config, }

	// Set up http router for incomming config requests
	router := mux.NewRouter()
	router.HandleFunc("/read/{serviceName}", c.ReadConfig)
	http.ListenAndServe(":8080", router)
	
}