package main

import (
	//"fmt"
	"net/http"
	"time"
	"log"

	"github.com/gorilla/mux" // HTTP router and URL matcher for building Go web servers
	"github.com/evenlwanvik-student/RESTful-home/service.config/domain"
	"github.com/evenlwanvik-student/RESTful-home/service.config/controller"
	"github.com/evenlwanvik-student/RESTful-home/service.config/service"
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
	// log and exit on failure
	log.Fatal(http.ListenAndServe(":80", router))
}