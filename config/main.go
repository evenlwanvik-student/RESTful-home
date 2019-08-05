package main

import (
	"github.com/evenlwanvik-student/RESTful-home/config/domain"
)

func main() {
	// create the configuration object
	config := domain.Config{}

	data, err := ioutil.ReadFile("/config.yaml")
	if err != nil {
		panic(err)
	}

	err = config.SetFromBytes(data)
	if err != nil {
		panic(err)
	}
}