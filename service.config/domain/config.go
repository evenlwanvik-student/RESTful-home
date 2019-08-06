package domain

import (
	"fmt"
	"sync"

	"gopkg.in/yaml.v2"
)

// abstraction around the map that holds the config values
type Config struct {
	// maps key (string) - value (empty interface, can be anything) pair
	// i.e. integers, strings, or more maps to implement the nested structure of an object
	config map[string]interface{}
	lock sync.RWMutex
}

// Set the internals of config based on byte array from YAML
func (c *Config) SetFromBytes(data []byte)  error{

	// Parse YAML data into empty interface
	var rawConfig interface{}
	if err := yaml.Unmarshal(data, &rawConfig); err != nil {
		return err
	}

	// yaml supports keys that are not string, so both key and value will be untyped (interface:interface)
	untypedConfig, ok := rawConfig.(map[interface{}]interface{})
	if !ok {
		return fmt.Errorf("config is not a map")
	}

	// convert untyped keys to strings
	config, err := convertKeysToStrings(untypedConfig)
	if err != nil {
		return err
	}

	// Write lock on config
	c.lock.Lock()
	defer c.lock.Unlock()
	
	c.config = config

	return nil
}

// Returns the config for a particular service
func (c *Config) Get(serviceName string) (map[string]interface{}, error) {
	// Read lock such that more than one user can read config at the same time
	c.lock.RLock()
	defer c.lock.RUnlock()

	baseConfig, ok := c.config["base"].(map[string]interface{}) 
	if !ok {
		return nil, fmt.Errorf("base config is not a map")
	}


	// If no config defined for the service
	if _, ok = c.config[serviceName]; !ok {
		return baseConfig, nil
	}

	serviceConfig, ok := c.config[serviceName].(map[string]interface{}) 
	if !ok {
		return nil, fmt.Errorf("service config %q is not a map", serviceName)
	}

	// Merge the maps where the service config takes presedence
	config := make(map[string]interface{})
	for k, v := range(baseConfig)    { config[k] = v }
	for k, v := range(serviceConfig) { config[k] = v }

	return config, nil
}

// Convert keys from interface to string, yaml -> json map
// I could cast all keys to string, but then we wouldn't know if there was a mistake in the config
func convertKeysToStrings(m map[interface{}]interface{}) (map[string]interface{}, error) {
	newMap := make(map[string]interface{})

	for k, v := range(m) {
		str, ok := k.(string) 
		if !ok {
			return nil, fmt.Errorf("config key is not a string")
		}

		// Check if value of current key is a new key or actual value
		if vMap, ok := v.(map[interface{}]interface{}); ok {
			var err error
			// Recursive call for nested key-value pairs
			v, err = convertKeysToStrings(vMap)
			if err != nil {
				return nil, err
			}
		}
		newMap[str] = v
	}

	return newMap, nil
}