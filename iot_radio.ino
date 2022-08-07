#include <ESP8266WiFi.h>
#include <Wire.h>
#include<TEA5767Radio.h>
TEA5767Radio radio = TEA5767Radio();
WiFiClient client;
WiFiServer server(80);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  WiFi.begin("Airtel-My WIFI", "samakhomewifi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print("..");
    delay(200);
  }
  Serial.println();
  Serial.println("NodeMCU is Connected!");
  Serial.println(WiFi.localIP());
  server.begin();
  Wire.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  client = server.available();
  if (client == 1)
  {
    String request = client.readStringUntil('\n');
    request.trim();
    request.remove(0, 5);
    request.remove(5, 13);
    float f1 = request.toFloat();
    Serial.println(f1);
    radio.setFrequency(f1);
    delay(1);
  }
}
