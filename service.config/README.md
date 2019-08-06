
# Config Service

Each service in this home automation system needs various types of configuration, e.g. flags to enable or disable particular features, ports to use, URL's to connect to etc. A device's configuration is often different in development vs in production, so hardcoding the values is not that practical. So, instead of each service managing its own configurations and having hardcoded configurations, I will create a consistent and centralized configuration service.

1. Read config from a YAML file
2. Support base config (base configuration for all services)
3. Return service config over JSON
4. Automatically reload config

### Domain
The domain package holds the types, which in this case is the config type. It holds the `Config` struct which is an abstraction to the underlying config data structure. 

* `Get` function returns the config for a particular service
* `SetFromBytes` sets the internals of config based on byte array from YAML
* `convertKeysToStrings` converts the keys from interface (yaml) to string (json)

### Controller
Handles HTTP requests and writes the config to the response

### Service
A service that updates the configuration every `n` (10-30) seconds