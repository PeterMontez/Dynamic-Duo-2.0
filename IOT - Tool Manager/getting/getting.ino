/**
 * This example is for new users which are familiar with other legacy Firebase libraries.
 *
 * The example shows how to set, push and get the values to/from Realtime database.
 *
 * All functions used in this example are blocking (sync) functions.
 *
 * This example will use the database secret for priviledge Realtime database access which does not need
 * to change the security rules or it can access Realtime database no matter what the security rules are set.
 *
 * This example is for ESP32, ESP8266 and Raspberry Pi Pico W.
 *
 * You can adapt the WiFi and SSL client library that are available for your devices.
 *
 * For the ethernet and GSM network which are not covered by this example,
 * you have to try another elaborate examples and read the library documentation thoroughly.
 *
 */

/** Change your Realtime database security rules as the following.
 {
  "rules": {
    ".read": true,
    ".write": true
  }
}
*/

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

void printError(int code, const String &msg)
{
    Firebase.printf("Error, msg: %s, code: %d\n", msg.c_str(), code);
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

}

void loop()
{
    // Set, push and get integer value

    // Serial.print("Set int... ");
    // bool status = Database.set<int>(client, "/01/key", 2);
    // if (status)
    //     Serial.println("ok");
    // else
    //     printError(client.lastError().code(), client.lastError().message());


    // Serial.print("Push int... ");
    // String name = Database.push<int>(client, "/test/push", 12345);
    // if (client.lastError().code() == 0)
    //     Firebase.printf("ok, name: %s\n", name.c_str());
    // else
    //     printError(client.lastError().code(), client.lastError().message());


    Serial.print("Get int... ");
    int v1 = Database.get<bool>(client, "/01/key");
    if (client.lastError().code() == 0)
        Serial.println(v1);
    else
        printError(client.lastError().code(), client.lastError().message());
    

    delay(500);
}