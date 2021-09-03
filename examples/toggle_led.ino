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