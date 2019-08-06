package service

import (
	"io/ioutil"
	"log"
	"time"

	// change back when moving into correct branch
	"../domain"
	//"github.com/evenlwanvik-student/RESTful-home/config/domain"
)

type ConfigService struct {
	Config *domain.Config
	Location string
}

// Watch reloads the config every d duration
func (service *ConfigService) Watch(d time.Duration) {
	for {
		err := service.Reload()
		if err != nil {
			log.Print(err)
		}

		time.Sleep(d)
	}
}

// Reload reads the config and applies changes
func (service *ConfigService) Reload() error {

	data, err := ioutil.ReadFile(service.Location)
	if err != nil {
		return err
	}

	err = service.Config.SetFromBytes(data)
	if err != nil {
		return err
	}

	return nil
}