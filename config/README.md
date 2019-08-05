
# Config Service

Each service in this home automation system needs various types of configuration, e.g. flags to enable or disable particular features, ports to use, URL's to connect to etc. A device's configuration is often different in development vs in production, so hardcoding the values is not that practical. So, instead of each service managing its own configurations and having hardcoded configurations, I will create a consistent and centralized configuration service.

1. Read config from a YAML file
2. Support base config (base configuration for all services)
3. Return service config over JSON
4. Automatically reload config