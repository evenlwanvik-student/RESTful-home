package domain

// abstraction around the map that holds the config values
type Config struct {
	// maps key (string) - value (empty interface, can be anything) pair
	// i.e. integers, strings, or more maps to implement the nested structure of an object
	config map[string]interface{}
}

// Set the internals of config based on byte array from YAML
func (c *Config) SetFromBytes(data []byte) {
	return nil
}

// Returns the config for a particular service
func (c *Config) Get(serviceName string) (map[string]interface{}, error) {
	return nil, nil
}