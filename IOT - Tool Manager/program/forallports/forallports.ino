#include <Arduino.h>
#if defined(ESP32) || defined(ARDUINO_RASPBERRY_PI_PICO_W)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif

#include <FirebaseClient.h>
#include <WiFiClientSecure.h>

#define WIFI_SSID "Vivo-Internet-BF17"
#define WIFI_PASSWORD "78814222"

#define DATABASE_URL "https://toolmanager-b1304-default-rtdb.firebaseio.com/"

WiFiClientSecure ssl;
DefaultNetwork network;
AsyncClientClass client(ssl, getNetwork(network));

FirebaseApp app;
RealtimeDatabase Database;
AsyncResult result;
NoAuth noAuth;

int builtinLed = 2;
int pins[15] = { 4, 16, 17, 5, 8, 19, 21, 3, 1, 22, 23, 36, 39, 34, 35 };
char cabinet[5] = "46";

void printError(int code, const String &msg){
  Firebase.printf("Error, msg: %s, code: %d\n", msg.c_str(), code);
}

void open(char drawer, int pin){
  String path;
  path = '/' + cabinet + '/' + drawer;
  digitalWrite(pin, LOW);
  delay(5000);
  bool status = Database.set<bool>(client, path, false);
  if(status)
    digitalWrite(pin, HIGH);

}

void setup()
{


  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
      Serial.print(".");
      delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.printf("Firebase Client v%s\n", FIREBASE_CLIENT_VERSION);

  ssl.setInsecure();
#if defined(ESP8266)
  ssl.setBufferSizes(1024, 1024);
#endif

  // Initialize the authentication handler.
  initializeApp(client, app, getAuth(noAuth));

  // Binding the authentication handler with your Database class object.
  app.getApp<RealtimeDatabase>(Database);

  // Set your database URL
  Database.url(DATABASE_URL);

  // In sync functions, we have to set the operating result for the client that works with the function.
  client.setAsyncResult(result);

  Serial.println("Testando portas");

  for(int i = 0; i < sizeof(pins); i++) {
    int crrPin = pins[i];
    Serial.println("    Testando porta " + crrPin);
    pinMode(crrPin, OUTPUT);
    digitalWrite(crrPin, LOW);
    delay(500);
    digitalWrite(crrPin, HIGH);
  }

  Serial.println("Trancando todos as gavetas");

  for(char drawer = 'A'; drawer <= 'O'; drawer++) {
    String path;
    path = '/' + cabinet + '/' + drawer;
    // snprintf(path, sizeof(path), "/%s/%c", cabinet, drawer);

    bool status = Database.set<bool>(client, path, false);
    if (status)
      Serial.println( drawer + " chave fechada");
    else
      printError(client.lastError().code(), client.lastError().message());
  }

  Serial.println("Configuração concluida");
  pinMode(builtinLed, OUTPUT);
  digitalWrite(builtinLed, HIGH);

}

void loop()
{
  
  int port = 0;
  for(char drawer = 'A' ; drawer <= 'O'; drawer++){
    Serial.println("");

    String path;
    path = '/' + cabinet + '/' + drawer;
    // snprintf(path, sizeof(path), "/%s/%c", cabinet, drawer);
    Serial.print("Status of " + drawer);
    bool status = Database.get<bool>(client, path);
    if (status)
      Serial.println(status);
    else
      printError(client.lastError().code(), client.lastError().message());

    if(status){ 
      open(drawer, pins[port]);
    }


    port ++;
  }

  //Serial.print("Status... ");
  //bool v1 = Database.get<bool>(client, "/01/key");
  //if (client.lastError().code() == 0)
  //  Serial.println(v1);
  //else
  //  printError(client.lastError().code(), client.lastError().message());
  

  //if(v1){
  //  open();
  //}

  delay(500);
}
