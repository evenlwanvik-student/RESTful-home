# 

The device registry service is the first microservice built for this project, and stores the information about all of the devices in the system that can be controlled. At its core it only has the basic abilities to create, read, and delete the states of the devices.


### get device state

**Definition**

`GET service.controller.hue/device/<device-identifier>`

**Response**

- `200 OK` on success
- `400 NOT FOUND` if device does not exist

```json
{
    "identifier": "bedroom-ceiling-lamp",
    "name": "Bedroom Ceiling Lamp",
    "state": {
        "brightness": {
            "type": "int",
            "min": 0,
            "max": 255,
            "value": 73
        }
    }
}
```

**Definition**

`PATCH service.controller.hue/device/<device-identifier>`

**Arguments**

The properties to be changed and their values

**Response**

- `200 OK` on success
- `400 BAD REQUEST` if request validation fails
- `404 NOT FOUND` if device does not exist

```json
{
    "identifier": "bedroom-ceiling-lamp",
    "name": "Bedroom Ceiling Lamp",
    "state": {
        "brightness": {
            "type": "int",
            "min": 0,
            "max": 255,
            "value": 73
        },
        "on": true
    }
}
```
