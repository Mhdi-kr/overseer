# overseer
## overview

Self-hosted IoT monitoring platform to gather and visualize data from multiple IoT devices (AKA nodes).
I follow the MVP (Minimum viable product) model for my personal projects. If I could design a system which can work with one nodeMCU device, one sensor and very simple UI for client-side, I would be able to build upon it, add more modules and improve the UI later on. so my initial plan is to create a closed circuit that works, then iterate over it and improve things as fast as possible.
## How to run the project on my server

1. Make sure you have Node.js and NPM installed using [Official Node releases and installations](https://nodejs.org/en/download/).

2. Install yarn using npm

```bash
$ npm install -g yarn
```
3. Make sure you have MongoDB database already installed using [Official mongoDB releases](https://docs.mongodb.com/manual/installation/)
4. Clone this repository using git commands
5. Install project dependencies using yarn package manager
```bash
$ yarn install
```
6. Run the project packages (react client and express server) in parallel using `dev` script
```bash
$ yarn run dev
```
_The react Client and Express server will occupy ports *3000* and *8080* by default, if you wish to use other ports you can provide a `.env` file in each package similar to the available `.example.env` files to alter default configurations._

## Adding nodes

You can connect any kind of IoT device to overseer as long as it can support MQTT pub/sub protocol. It can be a Node.js app, an MQTT client on your phone, Raspberry pi, etc.

Any of these examples subscribe to one or multiple topics, transfer data, and then the corresponding widget in the overseer client application will represent the real-time MQTT state. based on the type of the widget you can `read` or `write` or `read and write` data to specific topics.

Following code is provided for NodeMCU hardware to connect to this application.

```c++
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
 
const char* ssid = ""; // your wifi SSID
const char* password =  ""; // your wifi password
const char* mqttServer = ""; // deployed mqtt server
const int mqttPort = 1883; // mqtt port
const char* mqttUser = ""; // mqtt user - leave empty if not configured
const char* mqttPassword = ""; // mqtt password - leave empty if not configured
 
WiFiClient espClient;
PubSubClient client(espClient);
 
void setup() {
 
  Serial.begin(115200);
  pinMode(D3, OUTPUT);
  pinMode(D2, INPUT_PULLUP);
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
 
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
 
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
 
    if (client.connect("ESP8266Client", mqttUser, mqttPassword )) {
 
      Serial.println("connected");  
 
    } else {
 
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
 
    }
  }
 
  client.publish("esp/test", "Hello from ESP8266 | mehdi");
  client.subscribe("mahdi");
}
 
void callback(char* topic, byte* payload, unsigned int length) {

  // your custom logic goes here
  
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    if((char)payload[0] == 's'){
      Serial.println("yes");
      digitalWrite(D3,HIGH);  
      delay(1000);
      digitalWrite(D3,LOW);
    }
  }
 
  Serial.println();
  Serial.println("-----------------------");
 
}
 
void loop() {
  client.loop();
  if(digitalRead(D2) == LOW){
      Serial.println("pressed");
      client.publish("mahdi", "s");
      delay(1000);
  }
}
```

## System design

Using client-server architecture, there's a centralized Nest.js server that handles both MQTT subscriptions and RESTful API requests. On the client-side there's a React app that uses MQTT client library to subscribe to MQTT topics and display data. The data is then shown to the client by different forms and components based on it's type. Client can also tweak some settings and configurations and see the results immediately on the nodes.