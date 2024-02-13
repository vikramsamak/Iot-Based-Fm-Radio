#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>
#include <WiFiManager.h>
#include <TEA5767Radio.h>
#include <Wire.h>

TEA5767Radio radio;
WebSocketsServer webSocket = WebSocketsServer(81);

void handleWebSocketMessage(uint8_t num, WStype_t type, uint8_t* payload, size_t length) {
  // Convert the payload to a string
  String message = "";
  for (size_t i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  if (message.startsWith("SET_FREQUENCY:")) {
    String frequencyString = message.substring(14);
    // Extracting actual frequncy from message
    float frequency = frequencyString.toFloat();
    // For debugging
    Serial.println(frequency);
    // Setting radio frequency
    radio.setFrequency(frequency);
    // Send a response back to the client
    webSocket.sendTXT(num, ("Frequency set to: " + frequencyString).c_str());
  }
}

void setup() {
  Serial.begin(9600);
  WiFiManager wifiManager;
  wifiManager.autoConnect("IOT-FM-RADIO");
  Serial.println("CONNECTED");
  Serial.println(WiFi.localIP());
  webSocket.begin();
  Wire.begin();
  webSocket.onEvent(handleWebSocketMessage);
}

void loop() {
  webSocket.loop();
}
