package controller

import (
	"net/http"
	"fmt"
	"encoding/json"

	"github.com/gorilla/mux" // HTTP router and URL matcher for building Go web servers
	// change back when moving into correct branch
	"../domain"
	//"github.com/evenlwanvik-student/RESTful-home/config/domain"
)

type Controller struct {
	Config *domain.Config
}

// ReadConfig writes the config to the given http ResponseWriter
func (c *Controller) ReadConfig(w http.ResponseWriter, r *http.Request) {
	// set header of responsewriter
	w.Header().Set("content-type", "application/json; charset=UTF-8")
	vars := mux.Vars(r)
	serviceName, ok := vars["serviceName"]
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		// todo: find a way to write json response instead of "error" (lib/go/request and response)
		fmt.Fprintf(w, "error")
	}

	config, err := c.Config.Get(serviceName)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "error")
	}

	rsp, err := json.Marshal(&config)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "error")
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, string(rsp))
}